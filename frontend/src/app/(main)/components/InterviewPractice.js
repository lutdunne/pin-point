"use client";

import { Devonshire } from 'next/font/google';
import React, {useState} from 'react';

export default function InterviewPractice({ feedback, setFeedback }) {
    const [parsedText, setParsedText] = useState("");
    const [loading, setLoading] = useState(false); 
   
    const savedText = localStorage.getItem("parsedText");

    const handleAnalyse = async (e) => {
        

        if (!savedText) {
            console.log("No parsed text to analyze yet");
            return;
        }

        try {
            setLoading(true);
            console.log("Sending résumé text to OpenAI for analysis...");


            const response = await fetch("http://localhost:3001/interview-practice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: savedText }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Analyse failed:", text);
                return;
            }

            const data = await response.json();
            console.log("AI feedback received:", data);

            const old = JSON.parse(localStorage.getItem("feedback")) || {};  
            const updated = { ...old, interview: data }
            localStorage.setItem("feedback", JSON.stringify(updated));
            console.log("Data before setting state:", data);
            setFeedback(data);
            console.log("Interview feedback state:", feedback);


            // const objectUrl = URL.createObjectURL(file);

            // localStorage.setItem("fileUrl", objectUrl);
            // localStorage.setItem("feedback", JSON.stringify(data));
        } catch (err) {
        console.error("Analysis failed:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col w-1/2 p-6 border-r space-y-6">
            <div className='flex flex-col'>
                <h1 className="text-2xl font-bold mb-3 text-grey-600 ">Good morning.</h1>
                <p>Welcome to your interview practice.</p>
            </div>
            
            <div>
                {savedText && !feedback?.questions && (
                    <button
                        onClick={handleAnalyse}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {loading ? "Analyzing..." : "Start Interview Practice"}
                    </button>
                )}

                {feedback && "questions" in feedback && (
                    <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h prose prose-blue">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Interview Practice</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {feedback.questions.map((q, i) => (
                            <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
