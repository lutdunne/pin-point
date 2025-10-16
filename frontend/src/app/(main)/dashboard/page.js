"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFViewer } from "../components/PDFViewer.js";
import Sidebar from "../components/Sidebar";
import InterviewPractice from "../components/InterviewPractice.js";

export default function Dashboard() {
  	const [feedback, setFeedback] = useState({
    resume: {
		score: 74,
		strengths: [
			'Diverse project portfolio spanning desktop, web, and low‑level development',
			'Strong multi-language proficiency: Java, Python, C, JavaScript, PHP',
			'Solid foundation in data handling, databases, and full‑stack development',
			'Experience with collaboration, Git, and Linux in group projects',
			'Genuine initiative shown through independent projects (e.g., Naive Bayes tool, log analyzer)',
			'Practical work experience in QA, logistics, and retail demonstrating reliability and adaptability',
			'Clear exposure to problem solving, algorithms, and fundamental CS concepts through coursework'
		],
		improvements: [
			'Add a concise professional summary and clearly defined target role (e.g., QA Engineer or Full‑Stack Developer)',
			'Incorporate quantified impact for projects and roles (e.g., tests executed, performance gains, user metrics)',
			'Detail testing experience: methodologies (functional, regression), tools (e.g., Selenium, JUnit), and any automation work',
			'Provide a dedicated Technical Skills section with proficiency levels and organized categories (Languages, Frameworks, Databases, Tools)',
			'Standardize formatting for ATS readability: consistent dates, uniform bullet style, avoid line breaks that split words',
			'Include links to GitHub/portfolio and LinkedIn; consider adding a brief portfolio URL or project dashboards',
			'Clarify Naive Bayes project: data sources, evaluation metrics, privacy considerations, and real‑world applicability',
			'Consider removing or condensing unrelated roles (Store Assistant, Postal Operative) or reframing them to emphasize transferable skills'
		],
		action_plan: [
			'Create two targeted resume variants: one for QA Engineer roles and one for Full‑Stack Developer roles',
			'Add a dedicated Technical Skills section with proficiency ratings (e.g., Java 4/5, Python 4/5, SQL 3/5, HTML/CSS/JS 4/5)',
			'Revise Projects section to include: project title, role, tech stack, key contributions, and measurable outcomes',
			'Incorporate links to GitHub/portfolio and any live demos; add a professional summary at the top',
			'Quantify impact across projects and roles (e.g., test cases designed, automation coverage, performance improvements)',
			'Reformat resume for consistency (dates, bullet style, spacing) and ensure ATS-friendly layout',
			'Develop a single-page portfolio or README per project outlining architecture, results, and lessons learned',
			'Seek feedback from peers or mentors and iterate within two to four weeks'
		],
		overall_impression: 'Lut demonstrates solid CS foundations with a versatile project mix and practical work experience. With a focused target Role, quantified impact, and a polished, ATS-friendly resume structure ( plus a portfolio ), these credentials can be highly competitive for entry‑ to mid‑level software development or QA roles.',
	},
	interview: {
		questions: [
			'Please describe your highest level of education and how your degree has prepared you for this role.',
			'Walk me through a recent project or experience where you applied your technical skills to deliver a tangible result, including your role and the outcome.',
			'What technical tools, languages, or methodologies are you most proficient in, and how have you applied them in real-world work?',
			'Describe a challenging problem you faced in a team setting. What approach did you take, and what was the result?',
			'What motivates you in your work, and how does this role fit with your short- and long-term career goals?'
		],
	},
    target: null
  });
  
  const [currentView, setCurrentView] = useState("resume");
  const [fileUrl, setFileUrl] = useState(null);

 

  useEffect(() => {
    // const savedUrl = localStorage.getItem("fileUrl");
    const savedFeedback = localStorage.getItem("feedback");
    // if (savedUrl) setFileUrl(savedUrl);
	const hardcodedUrl = "/test-cv.pdf"; // path to your test PDF in /public
  	setFileUrl(hardcodedUrl);

    if (savedFeedback) {
		try {
			const obj = JSON.parse(savedFeedback);
			setFeedback({...feedback, resume: obj});
		} catch (e) {
			console.error("Could not parse saved feedback:", savedFeedback, e);
			setFeedback({...feedback, resume: null});
		}
    }
  }, []);

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
      	<Sidebar setCurrentView={setCurrentView} />
        {currentView === "resume" && feedback && (
        <div className="flex flex-col justify-start items-start w-1/2 p-6 border-r space-y-6">
        	<h1 className="text-2xl font-bold mb-8 text-grey-600 ">Good morning,</h1>
            <p>Welcome to your resume review.</p>
            <div className="mt-6 bg-white shadow-md rounded p-6 w-full text-gray-800 overflow-y-auto max-h prose prose-blue">
            	<h2 className="text-2xl font-semibold mb-4 text-blue-600">Résumé Analysis</h2>

				{"score" in feedback && (
					<p className="text-xl font-bold mb-4">Your resume scored {feedback.resume?.score} out of 100.</p>
				)}

				{Array.isArray(feedback.resume?.strengths) && feedback.resume?.strengths.length > 0 && (
					<>
					<h3 className="mt-4 text-lg font-semibold text-green-700">Strengths</h3>
					<ul className="list-disc pl-5 space-y-1">
						{feedback.resume.strengths.map((s, i) => <li key={i}>{s}</li>)}
					</ul>
					</>
				)}

				{Array.isArray(feedback.resume?.improvements) && feedback.resume?.improvements.length > 0 && (
					<>
					<h3 className="mt-4 text-lg font-semibold text-yellow-700">Improvements</h3>
					<ul className="list-disc pl-5 space-y-1">
						{feedback.resume.improvements.map((w, i) => <li key={i}>{w}</li>)}
					</ul>
					</>
				)}

				{Array.isArray(feedback.resume?.action_plan) && feedback.resume?.action_plan.length > 0 && (
					<>``
					<h3 className="mt-4 text-lg font-semibold text-blue-700">Action Plan</h3>
					<ul className="list-disc pl-5 space-y-1">
						{feedback.resume.action_plan.map((a, i) => <li key={i}>{a}</li>)}
					</ul>
					</>
				)}

				{feedback.resume?.overall_impression && (
					<>
					<h3 className="mt-4 text-lg font-semibold text-gray-800">Overall Impression</h3>
					<p className="mt-1">{feedback.resume.overall_impression}</p>
					</>
				)}
            </div>
        </div>
        )}
        {currentView === "interview" && (
			<InterviewPractice 
				feedback={feedback.interview} 
				setFeedback={(updated) => 
				setFeedback((prev) => ({ ...prev, interview: updated }))
				} 
			/>
		)}
        {currentView === "target" && (
          <h1>Target CV Analysis</h1>
        )}
          
      	<div className="flex bg-white w-1/2 p-6 h-full">
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