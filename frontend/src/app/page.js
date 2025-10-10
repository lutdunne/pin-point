"use client";

import Image from "next/image";
import { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [file, changeFile] = useState("uploaded_file");
  const [feedback, setFeedback] = useState("");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploaded_file", file);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch("http://localhost:3001/uploads", {
      method: "POST",
      body: formData,
    });

    const output = await response.json();

    setFeedback(output.feedback);
  };


  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">CareerCopilot</h1>

      <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload your résumé (PDF):
        </label>
        <input
          type="file"
          accept=".pdf,.txt"
          name="uploaded_file"
          className="w-full text-sm mb-4"
          onChange={(e) => changeFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Analyze Résumé
        </button>
      </form>
      {feedback && (
        <div className="mt-6 bg-white shadow-md rounded p-6 w-full max-w-3xl text-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Résumé Analysis</h2>
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}

function PDFViewer() {
  return (
    <div>
      <h2>Embedding PDF with iframe</h2>
      <iframe
        src="/document.pdf"
        width="100%"
        height="1000px"
        title="PDF Viewer"
      />
    </div>
  );
}

// export PDFViewer as a named export if needed
export { PDFViewer };