

const express = require('express');
const cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const pdfParse = require("pdf-parse");
const fs = require("fs").promises;
require("dotenv").config();
const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const PORT = 3001;

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


app.post('/uploads', upload.single('uploaded_file'), async (req, res) => {
    console.log(req.file, req.body)
    // res.status(200).json({ message: "File uploaded successfully!" });
    
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // read the file buffer
    const buffer = await fs.readFile(req.file.path);

    // extract text
    const data = await pdfParse(buffer);

    // cleans data
    const clean_text = data.text.replace(/\s/g, '').trim();
    

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: `
            You are a senior technical recruiter and career coach.
            Analyze résumés for clarity, technical strength, and impact.
            Structure your response with the sections:
            1. Strengths
            2. Areas for Improvement
            3. Suggested Action Plan
            4. Overall Impression
            Keep the tone professional and encouraging.
            `},
            { role: "user", content: `Analyze this resume:\n\n${data.text}` },
        ],
    });

    const feedback = response.choices[0].message.content;
    console.log(feedback);
    res.json({ feedback });
    
    // console.log(response.output_text); 
});