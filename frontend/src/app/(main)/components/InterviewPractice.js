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
       <div className="flex flex-col w-full p-10 space-y-8 text-gray-800">
  {/* Header */}
  <div className="flex flex-col">
    <h1 className="text-3xl font-bold text-[#0D2137] mb-2">
      Good morning<span className="text-[#e67b77]">.</span>
    </h1>
    <p className="text-gray-600">Welcome to your interview practice.</p>
  </div>

  {/* Action Button */}
  <div className="w-full">
    {savedText && !feedback?.questions && (
      <button
        onClick={handleAnalyse}
        disabled={loading}
        className={`w-full py-3 px-6 font-semibold rounded-xl shadow-md transition 
          ${loading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-[#e67b77] hover:bg-[#d66b68] text-white"}`}
      >
        {loading ? "Analyzing..." : "Start Interview Practice"}
      </button>
    )}
  </div>

  {/* Results Section */}
  {feedback && "questions" in feedback && (
    <div className="bg-[#f6f6f7] shadow-md rounded-xl p-8 w-full space-y-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0D2137]">Interview Questions</h2>
        <span className="text-sm text-gray-500 italic">AI-generated based on your résumé</span>
      </div>

      <ul className="list-decimal pl-6 space-y-4">
        {feedback.questions.map((q, i) => (
          <li 
            key={i} 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <p className="text-gray-700 leading-relaxed">{q}</p>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
    );
}
