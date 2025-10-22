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

                <div className="flex flex-col overflow-y">
                    <div className="flex flex-col bg-white shadow-md rounded-xl p-30 w-3/4 text-gray-800 mx-auto">
                        <div className="flex justify-end"><button className="rounded-xl bg-red-100 shadow-md p-2">How It Works</button></div>
                        <div className="flex flex-row">
                            <div className="flex flex-col items-center text-center mb-6">
                                <h1 className="text-3xl font-bold leading-tight">
                                    Analyse Your Resume
                                </h1>
                                <h2 className="text-3xl font-bold leading-tight">
                                    with <span className="text-blue-500">AI-Powered Insights</span>
                                </h2>
                                <p>Optimize your resume, get ATS-ready, and land your dream job faster.</p>
                            </div>
                            <form
                                encType="multipart/form-data" 
                                className="bg-white  px-8 pt-6 pb-8 mb-4 w-96"
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
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4 py-2 px-4 rounded w-full"
                                >
                                    {loading ? "Analyzing..." : "Analyze Résumé"}
                                </button>
                            </form>
                        </div>
                        
    
                         
                    </div>
                    
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 mt-8">
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Smart Resume Analysis</h3>
                            <p>Get instant feedback on your resume's effectiveness</p>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Detailed Insights</h3>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Actionable Recommendations</h3>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 mt-8">
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Smart Resume Analysis</h3>
                            <p>Get instant feedback on your resume's effectiveness</p>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Detailed Insights</h3>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h">
                            <h3 className="text-xl font-semibold">Actionable Recommendations</h3>
                            <ul className="mt-4 space-y-1">
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Analyzes keyword optimization for ATS systems</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Identifies missing crucial skills or experiences</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                    <span className="text-[var(--primary)] mt-0">•</span>
                                    <span>Suggests industry-specific improvements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    
                    
                    
                </div>
                
            )}
            
        </div>
    );
}