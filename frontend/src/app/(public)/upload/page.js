"use client";

// Imports
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../../(main)/components/FileUpload";
import LoadingPage from "../../(main)/components/LoadingPage";


export default function Upload() {
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false); 
    const [fileUrl, setFileUrl] = useState(null);

    
    const router = useRouter();

    async function handleUploadAndAnalyse(e) {
        e.preventDefault();
        setLoading(true);

        const text = await handleUploadFile(e);  // first upload
        if (!text) return;
        await handleAnalyse(text);// then analyze
        router.push("/dashboard");
    }

    // Upload + parse resume
    const handleUploadFile = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior 
        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("uploaded_file", file);

        try {
            setLoading(true);
            console.log("Sending file to backend:", file.name);

            // Upload file to backend
            const response = await fetch("http://localhost:3001/uploads", {
                method: "POST",
                body: formData,
            });

            
            const data = await response.json(); // { text: "extracted text..." }
            console.log("Uploaded", data);

            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
            setFileUrl(URL.createObjectURL(file));
            
            return data.text // store extracted text for analysis
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setLoading(false);
        } 
    };


    const handleAnalyse = async (text) => {
        if (!text) {
            console.log("No parsed text to analyze yet");
            return;
        }

        try {
            setLoading(true);
            console.log("Sending résumé text to OpenAI for analysis...");

            const response = await fetch("http://localhost:3001/analyse-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.log("Raw response:", text);
                if (text) {
                    try {
                        const data = JSON.parse(text);
                        console.error("Parsed error:", data);
                    } catch (err) {
                        console.error("Response not JSON:", err);
                    }
                }
                return;
            }

            const data = await response.json();
            console.log("AI feedback received:", data);

            setFeedback(data.feedback);

            const objectUrl = URL.createObjectURL(file);

            localStorage.setItem("fileUrl", objectUrl);
            localStorage.setItem("parsedText", data.text);
            localStorage.setItem("feedback", JSON.stringify(data));
        } catch (err) {
            console.error("Analysis failed:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
                <form
                    encType="multipart/form-data" 
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
                > 
                    <FileUpload onFileChange={setFile} />
                    
                    {file && (
                    <p className="text-sm text-gray-600 mt-2">
                        Selected file: <span className="font-semibold">{file.name}</span>
                    </p>
                    )}
                    <button
                        onClick={handleUploadAndAnalyse}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        {loading ? "Analyzing..." : "Analyze Résumé"}
                    </button>
                </form> 
            )}
            
        </div>
    );
}