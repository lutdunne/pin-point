"use client"
{/*
    user pastes job description
    send text to baclend using button and parse and clean
    ai ouput
    
    match: 78
    missing skills: []
    suggestions: ""

    
*/}
import { useState } from "react";


export default function TargetMyCV({feedback, setFeedback}) {
    const [jobDesc, setJobDesc] = useState("");
    

    const handleJobText = async (e) => {
        const resumeText = localStorage.getItem("parsedText");
        e.preventDefault();
        if (!resumeText || !jobDesc) {
            console.log("Need both resume and job description");
            return;
        }

        console.log("Sending to backend:", {
            resumeText: resumeText?.slice(0, 200), // only show first 200 chars
            jobDesc: jobDesc?.slice(0, 200)
        });

        try {
            const response = await fetch("http://localhost:3001/target", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resumeText,
                    jobDesc,  // from useState or form input
                }),
            });  
            
            const data = await response.json();
            console.log("AI feedback received:", data);

            const old = JSON.parse(localStorage.getItem("feedback")) || {};  
            const updated = { ...old, target: data }
            localStorage.setItem("feedback", JSON.stringify(updated));
            console.log("Data before setting state:", data);
            setFeedback(data);
            console.log("Interview feedback state:", feedback);
            
        } catch (err) {
            console.error("Upload failed:", err);
        }
    }
    return (
        <div className="flex flex-col justify-start items-start w-1/2 p-6 border-r space-y-6 overflow-y-auto">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-3 text-grey-600">Target My CV</h1>
                <p>Paste a job description below to analyze how well your résumé matches.</p>
            </div>

            <div className="mt-6 bg-white shadow-md rounded-xl p-6 w-full text-gray-800 overflow-y-auto max-h prose prose-blue">
                <form onSubmit={handleJobText} className="space-y-4 ">
                    <label className="block text-gray-700">Paste the job description:</label>
                    <textarea 
                        className="w-full border rounded p-2 h-32"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
                        Analyze Job Description
                    </button>
                </form>


                {feedback && "match" in feedback && (
                    <p className="text-md font-semibold mb-2">You were a {feedback?.match}% match for this job.</p>
                )}
                {Array.isArray(feedback?.missing_skills) && feedback?.missing_skills.length > 0 && (
                    <>
                        <h3 className="mt-4 text-lg font-semibold text-green-700">Missing Skills</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {feedback?.missing_skills.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </>
				)}
                {feedback?.suggestions && (
						<>
							<h3 className="mt-4 text-lg font-semibold text-gray-800">Suggestions</h3>
							<p className="mt-1">{feedback.suggestions}</p>
						</>
					)}
            </div>
        </div>
    );
}



// export default function TargetMyCv() {
//   return (
//     <div className="flex flex-col flex-1  p-6 border-r space-y-6">
//       <div className="flex flex-col flex-1 justify-between">
//         <div>
//           <h1 className="text-2xl font-bold mb-3 text-grey-600">Target My CV</h1>
//           <p>Paste a job description below to analyze how well your résumé matches.</p>
//         </div>

//         <form className="space-y-4 mt-6">
//           <label className="block text-gray-700">Paste the job description:</label>
//           <textarea className="w-full border rounded p-2 h-32" />
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
//             Analyze Job Description
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }