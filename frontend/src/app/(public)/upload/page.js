
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../../(main)/components/FileUpload";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [parsedText, setParsedText] = useState("");
    const [loading, setLoading] = useState(false); 
    const [fileUrl, setFileUrl] = useState(null);
    
    const router = useRouter();

    // Upload + parse resume
    const handleUploadFile = async (e) => {
        e.preventDefault();
        if (!file) {
        console.log("No file selected");
        return;
        }

        const formData = new FormData();
        formData.append("uploaded_file", file);

        try {
        setLoading(true);
        console.log("Sending file to backend:", file.name);

        const response = await fetch("http://localhost:3001/uploads", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Uploaded", data);
        setParsedText(data.text);
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }
        setFileUrl(URL.createObjectURL(file));
        } catch (err) {
        console.error("Upload failed:", err);
        } finally {
        setLoading(false);
        } 
    };


    const handleAnalyse = async (e) => {
        if (!parsedText) {
            console.log("No parsed text to analyze yet");
            return;
        }

        try {
        setLoading(true);
        console.log("Sending résumé text to OpenAI for analysis...");

        const response = await fetch("http://localhost:3001/analyse-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: parsedText }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Analyse failed:", text);
            return;
        }

        const data = await response.json();
        console.log("AI feedback received:", data);

        setFeedback(data.feedback);

        const objectUrl = URL.createObjectURL(file);

        localStorage.setItem("fileUrl", objectUrl);
        localStorage.setItem("feedback", JSON.stringify(data));
        
        router.push("/dashboard");
        } catch (err) {
        console.error("Analysis failed:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleUploadFile} 
                encType="multipart/form-data" 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload your résumé (PDF):
                </label>

                <FileUpload onFileChange={setFile} />
                
                {file && (
                <p className="text-sm text-gray-600 mt-2">
                    Selected file: <span className="font-semibold">{file.name}</span>
                </p>
                )}
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
                >
                {loading ? "Uploading..." : "Upload & Parse"}
                </button>
            </form>
            {/* Parsed résumé confirmation */}
            {parsedText && (
            <p className="text-sm text-gray-700 mb-4">
                File parsed successfully. Ready for analysis.
            </p>
            )}

            

            {/* Analyze button */}
            {parsedText && (
            <button
                onClick={handleAnalyse}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
                {loading ? "Analyzing..." : "Analyze Résumé"}
            </button>
            )}
        </div>
    );
}