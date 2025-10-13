"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFViewer } from "../components/PDFViewer.js";


export default function Dashboard() {
  const [feedback, setFeedback] = useState(null)
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem("fileUrl");
    const savedFeedback = localStorage.getItem("feedback");
    if (savedUrl) setFileUrl(savedUrl);

    if (savedFeedback) {
      try {
        const obj = JSON.parse(savedFeedback);
        setFeedback(obj);
      } catch (e) {
        console.error("Could not parse saved feedback:", savedFeedback, e);
        setFeedback(null);
      }
    }
  }, []);

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
      <div className="flex flex-col justify-start items-start w-1/2 p-6 border-r space-y-6">
        <h1 className="text-4xl font-bold mb-8 text-grey-600 ">Good Morning,</h1>
        <p>Welcome to your resume review.</p>
        {/* Upload form */}
        
      
      {/* AI feedback display */}
      {feedback && (
        <div className="mt-6 bg-white shadow-md rounded p-6 w-full text-gray-800 overflow-y-auto max-h prose prose-blue">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Résumé Analysis</h2>

          {"score" in feedback && (
            <p className="text-xl font-bold mb-4">Your resume scored {feedback.score} out of 100.</p>
          )}

          {Array.isArray(feedback.strengths) && feedback.strengths.length > 0 && (
            <>
              <h3 className="mt-4 text-lg font-semibold text-green-700">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}

          {Array.isArray(feedback.improvements) && feedback.improvements.length > 0 && (
            <>
              <h3 className="mt-4 text-lg font-semibold text-yellow-700">Improvements</h3>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.improvements.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </>
          )}

          {Array.isArray(feedback.action_plan) && feedback.action_plan.length > 0 && (
            <>
              <h3 className="mt-4 text-lg font-semibold text-blue-700">Action Plan</h3>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.action_plan.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </>
          )}

          {feedback.overall_impression && (
            <>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">Overall Impression</h3>
              <p className="mt-1">{feedback.overall_impression}</p>
            </>
          )}
        </div>
      )}
      </div>
      <div className="flex-1 bg-white w-1/2 p-6 overflow-hidden">
        {/* PDF preview */}
        {fileUrl ? (
          <PDFViewer fileUrl={fileUrl} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No résumé uploaded yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}

      // {feedback && (
      //   <div>
      //     <h2 className="text-2xl font-bold">Score: {feedback.score}%</h2>
      //     <h3 className="mt-4 text-xl font-semibold text-green-600">Strengths</h3>
      //     <ul className="list-disc pl-5">
      //       {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
      //     </ul>

      //     <h3 className="mt-4 text-xl font-semibold text-red-600">Weaknesses</h3>
      //     <ul className="list-disc pl-5">
      //       {feedback.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
      //     </ul>

      //     <h3 className="mt-4 text-xl font-semibold text-blue-600">Suggestions</h3>
      //     <ul className="list-disc pl-5">
      //       {feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
      //     </ul>
      //   </div>
      // )}