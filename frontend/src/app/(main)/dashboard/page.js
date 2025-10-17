"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFViewer } from "../components/PDFViewer.js";
import Sidebar from "../components/Sidebar";
import InterviewPractice from "../components/InterviewPractice.js";
import TargetMyCV from "../components/TargetMyCV.js";

export default function Dashboard() {
  	const [feedback, setFeedback] = useState({
		resume: {
			score: 74,
			score_summary: [
				'This is a solid start with clear technical potential.',
				'Your hands-on projects and range of languages show a strong foundation, but there are formatting, clarity, and impact gaps that hiring managers often notice.', 
				'By tightening the resume structure, adding quantified outcomes, and showcasing a targeted narrative, you can significantly lift your score with a focused revision.',
			],
			strengths: [
				'Strong project portfolio across multiple languages (Java, Python, C, JavaScript, PHP) demonstrating practical coding and problem-solving ability.',
				'Diverse hands-on experience in both back-end and front-end development, plus data handling and basic ML concepts.',
				'Active engagement in education and extra-curricular activities, showing commitment to learning and collaboration.'
			],
			improvements: [
				'Improve formatting and consistency (headings, bullet style, dates) and add a concise professional summary.',
				'Quantify impact in work experience and projects (e.g., defects found, performance metrics, user counts, time saved).',
				'Add a portfolio or GitHub URL and ensure project descriptions clearly state outcomes and tech stack.',
				'Consider tailoring the resume to target roles (e.g., software engineer, QA/test automation) and ensure content is professional and appropriate.'
			],
			action_plan: [
				'Create a concise top summary and clean, consistent section headers.',
				'Add quantified bullets to each role and project where possible.',
				'Link to portfolio/GitHub; include a clear Skills section detailing languages, tools, and methodologies.',
				'Standardize dates and formatting; refine project descriptions to emphasize outcomes and relevance to target roles.',
				'Prepare a targeted version for 2–3 roles and re-upload for re-evaluation.'
			],
			overall_impression: 'You have a solid foundation with broad technical breadth and ongoing education. With focused formatting, measurable outcomes, and a portfolio link, your resume will stand out more to recruiters. Revise with these changes and re-upload to pursue a higher score.',
			contact_issues: ["Github"],
			repeatedWords: [],
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

	const hour = new Date().getHours();
    let greeting = "";

	if (hour < 12) {
		greeting = "Good morning";
	} else if (hour < 18) {
		greeting = "Good afternoon";
	} else {
		greeting = "Good evening";
	}


	useEffect(() => {
	const hardcodedUrl = "/test-cv.pdf"; // path to your test PDF in /public
	setFileUrl(hardcodedUrl);
	}, []);
	
		useEffect(() => {
	if (feedback?.resume) {
		console.log("Contact issues:", feedback.resume.contact_issues);
	} else {
		console.log("Feedback resume missing");
	}
	}, [feedback]);
 

	// useEffect(() => {
	// 	// const savedUrl = localStorage.getItem("fileUrl");
	// 	const savedFeedback = localStorage.getItem("feedback");
	// 	// if (savedUrl) setFileUrl(savedUrl);
		

	// 	if (savedFeedback) {
	// 		try {
	// 			const obj = JSON.parse(savedFeedback);
	// 			if (obj.resume) {
	// 			setFeedback(obj); // means localStorage already has the right structure
	// 			} else {
	// 			setFeedback({ ...feedback, resume: obj });
	// 			}
	// 		} catch (e) {
	// 			console.error("Could not parse saved feedback:", savedFeedback, e);
	// 		}
	// 	}
	// }, []);	

  return (
    <main className="flex h-screen w-full bg-gray-100 text-gray-900 overflow-hidden items-stretch">
		
			<Sidebar setCurrentView={setCurrentView} />
		
        {currentView === "resume" && feedback && (
			<div className="flex flex-col justify-start items-start w-1/2 p-6 border-r space-y-6 overflow-y-auto">
				<h1 className="text-2xl font-bold mb-8 text-grey-600 ">{greeting}.</h1>
				<p>Welcome to your resume review.</p>
				<div className="mt-6 bg-white shadow-md rounded-xl p-6  w-full text-gray-800 max-h prose prose-blue"> {/*card*/}
					{/* <h2 className="text-2xl font-semibold mb-4 text-blue-600">Résumé Analysis</h2> */}

					{"score" in feedback.resume && (
						<p className="text-md font-semibold mb-2">Your resume scored {feedback.resume?.score} out of 100.</p>
					)}
					{feedback.resume?.overall_impression && (
						<>
							<h3 className="mt-4 text-lg font-semibold text-gray-800">Overall Impression</h3>
							<p className="mt-1">{feedback.resume.overall_impression}</p>
						</>
					)}
				</div>
				<div className="mt-6 bg-white shadow-md rounded-xl p-6 mb-14 w-full text-gray-800 max-h prose prose-blue"> {/*card*/}	
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
						<>
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
					{Array.isArray(feedback.resume?.contact_issues) && feedback.resume.contact_issues.length > 0 && (
						<>
							<h3 className="text-lg font-semibold text-red-700">Missing Contact Info</h3>
							<ul className="list-disc pl-5">
								{feedback.resume.contact_issues.map((item, i) => <li key={i}>{item}</li>)}
							</ul>
						</>
					)}
					{Array.isArray(feedback.resume?.repeatedWords) && (
						<>
							<h3 className="text-lg font-semibold text-red-700">Repeated Words</h3>
							{!feedback.resume.repeatedWords || feedback.resume.repeatedWords.length === 0 ? (
								<p>No repeated words found</p>
							) : (
								<>
									<p>
										Number of repeated words: {feedback.resume.repeatedWords.length}
									</p>
									<ul className="list-disc pl-5">
										{feedback.resume.repeatedWords.map((item, i) => (
											<li key={i}>{item}</li>
										))}
									</ul>
								</>
							)}
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
			<TargetMyCV 
				feedback={feedback.target} 
				setFeedback={(updated) => 
					setFeedback((prev) => ({ ...prev, target: updated }))
				}
			/>
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