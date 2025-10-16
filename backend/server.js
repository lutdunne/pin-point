const express = require('express');
const cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const pdfParse = require("pdf-parse");
const fs = require("fs").promises;
require("dotenv").config();
const OpenAI = require("openai");
const { connect } = require('http2');
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200, 
    })
);

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to root URL of Server");
});


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);

// Upload endpoint for receiving PDF files
app.post('/uploads', upload.single('uploaded_file'), async (req, res) => {
    // console.log(req.file, req.body)
    // res.status(200).json({ message: "File uploaded successfully!" });
    console.log("[DEBUG] /uploads route hit");
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    } else {
        console.log(req.file.originalname);
    }

    // read the file buffer
    const buffer = await fs.readFile(req.file.path);

    // extract text
    const data = await pdfParse(buffer);

    // cleans data
    const clean_text = data.text.replace(/\s/g, '').trim();
    
    console.log("CV Processed");
    res.json({ text: data.text });
    
});

// Analyse résumé text with OpenAI
app.post('/analyse-resume', async (req, res) => {
    
    const { text } = req.body; // const text = req.body.text;

    const response = await client.chat.completions.create({
        model: "gpt-5-nano",
        messages: [
            { role: "system", content: `
                You are a senior technical recruiter and career coach.
                Analyze résumés for clarity, technical strength, and impact.
                Respond ONLY in JSON with this structure
                { 'score': number (0-100), 'strengths': [list of strengths], 'improvements': [list of improvements], 'action_plan': [list of action items], 'overall_impression': string }.
                Keep the tone professional and encouraging.
            `},
            { role: "user", content: `Analyze this resume:\n\n${text}` },
        ],
    });

    let raw = response.choices[0].message.content.trim(); 

    if (raw.startsWith("```")) {
        raw = raw.replace(/```(json)?/g, "").trim();
    }
    try {
        const feedback = JSON.parse(raw); // transform JSON string into object
        console.log("[AI Feedback Parsed]", feedback);
        res.json(feedback); // convert back to JSON and send to client, express can only send text over http
    } catch (err) {
        console.error("[PARSE ERROR]", raw, err);
        res.status(500).json({ error: "Invalid JSON from AI", raw });
    }

    // console.log(response.output_text);
});

// Interview practice - generate interview questions from résumé text
app.post('/interview-practice', async (req, res) => {
    try {
        const { text } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: `
                    You are a senior technical recruiter and career coach.
                    Your only task is to generate 5 common interview questions based on the following résumé.
                    Base the questions on the candidate's degree (if listed), experience, and skills.
                    Respond ONLY in JSON with this structure
                    { 'questions': [list of questions] }.
                    Keep the tone professional and encouraging.
                `},
                { role: "user", content: `Generate interview questions for the following résumé:\n\n${text}` },
            ],
        });

        let raw = response.choices[0].message.content.trim();

        if (raw.startsWith("```")) {
            raw = raw.replace(/```(json)?/g, "").trim();
        }

        const feedback = JSON.parse(raw);
        console.log("[AI Feedback Parsed]", feedback);
        res.json(feedback);
    } catch (err) {
        console.error("[ERROR in /analyse-resume]", err.message);
        res.status(500).json({ error: "Failed to parse AI response", details: err.message });
    }
    
    // console.log(response.output_text); 
});