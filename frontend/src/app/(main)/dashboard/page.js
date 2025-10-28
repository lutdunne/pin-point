"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import { PDFViewer } from "../components/PDFViewer.js";
import Sidebar from "../components/Sidebar";
import InterviewPractice from "../components/InterviewPractice.js";
import TargetMyCV from "../components/TargetMyCV.js";
import { useView } from "../components/ViewContext.js";
import { Repeat, CircleUserRound, Check, X} from "lucide-react";


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
  
	const [fileUrl, setFileUrl] = useState(null);
	const { currentView } = useView();


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
    <main className="flex h-screen w-full bg-white overflow-hidden items-stretch">
        {currentView === "resume" && feedback && (
			<div className="flex flex-col justify-start items-start w-full p-6 px-30 border-r space-y-6 overflow-y-auto">
				<h1 className="text-2xl font-bold mb-8 ">{greeting}.</h1>
				<p>Welcome to your resume review.</p>
				<div className="mt-6 bg-[#f6f6f7] shadow-md rounded-xl p-6  w-full max-h prose prose-blue"> {/*card*/}
					{/* <h2 className="text-2xl font-semibold mb-4 text-blue-600">Résumé Analysis</h2> */}

					{feedback.resume?.score && (
						<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center mb-6 transition hover:shadow-md">
							<p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
							Résumé Score
							</p>
							<p className="text-5xl font-extrabold text-[#e67b77] mt-2">
							{feedback.resume.score}
							<span className="text-lg text-gray-400"> /100</span>
							</p>
							<p className="mt-2 text-sm text-gray-500">
							Based on formatting, clarity, and impact.
							</p>
						</div>
						)}

						{feedback.resume?.score_summary && (
						<div className="bg-[#f6f6f7] rounded-xl shadow-sm p-5">
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Score summary
							</h3>
							<p className="text-gray-700 leading-relaxed">
							{feedback.resume.score_summary}
							</p>
						</div>
						)}
				</div>
				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
					{/* Strengths */}
					{Array.isArray(feedback.resume?.strengths) && feedback.resume.strengths.length > 0 && (
						<div className="bg-green-50 border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
						<h3 className="flex items-center text-lg font-semibold text-green-700 mb-3">
							💪 Strengths
						</h3>
						<ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
							{feedback.resume.strengths.map((s, i) => (
							<li key={i}>{s}</li>
							))}
						</ul>
						</div>
					)}

					{/* Improvements */}
					{Array.isArray(feedback.resume?.improvements) && feedback.resume.improvements.length > 0 && (
						<div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
						<h3 className="flex items-center text-lg font-semibold text-yellow-700 mb-3">
							⚙️ Improvements
						</h3>
						<ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
							{feedback.resume.improvements.map((w, i) => (
							<li key={i}>{w}</li>
							))}
						</ul>
						</div>
					)}

					{/* Action Plan */}
					{Array.isArray(feedback.resume?.action_plan) && feedback.resume.action_plan.length > 0 && (
						<div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
						<h3 className="flex items-center text-lg font-semibold text-blue-700 mb-3">
							🎯 Action Plan
						</h3>
						<ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
							{feedback.resume.action_plan.map((a, i) => (
							<li key={i}>{a}</li>
							))}
						</ul>
						</div>
					)}
					</div>

					{/* Overall Impression */}
					{feedback.resume?.overall_impression && (
					<div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
						<h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
						📝 Overall Impression
						</h3>
						<p className="text-gray-700 leading-relaxed">{feedback.resume.overall_impression}</p>
					</div>
					)}
					{/* legacy alternative layout removed to fix JSX comment nesting */}
					{Array.isArray(feedback.resume?.contact_issues) && (
						<div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition hover:shadow-md">
							{/* Header */}
							<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
							<span className="text-blue-500 text-xl"><CircleUserRound /></span> Contact Information
							</h3>

							<p className="text-sm text-gray-600 mb-4">
							We’ve found the following contact details in your résumé:
							</p>

							{/* Example of found contact info (can make dynamic later) */}
							<div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between mb-2">
							<p className="font-medium text-green-700 flex items-center gap-2">
								<Check /><span>Phone Number:</span>
							</p>
							<p className="text-gray-700 text-sm">+353 852 671 498</p>
							</div>

							<div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between mb-4">
							<p className="font-medium text-green-700 flex items-center gap-2">
								<Check /><span>Email Address:</span>
							</p>
							<p className="text-gray-700 text-sm">lutdunne@gmail.com</p>
							</div>

							{/* Missing contact info section */}
							{feedback.resume.contact_issues.length > 0 && (
							<>
								<p className="font-semibold text-gray-800 mb-2">
								Although, you are missing essential contact information:
								</p>
								{feedback.resume.contact_issues.map((item, i) => (
								<div
									key={i}
									className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between mb-2"
								>
									<p className="font-medium text-red-700 flex items-center gap-2">
									<X /><span>{item}</span>
									</p>
									<p className="text-gray-600 text-sm max-w-md">
									You may be missing your {item} in your résumé or using a non-ATS-friendly format.
									</p>
								</div>
								))}
							</>
							)}
						</div>
						)}
					{/* {Array.isArray(feedback.resume?.repeatedWords) && (
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
					)} */}
					{Array.isArray(feedback.resume?.repeatedWords) && (
						<div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition hover:shadow-md">
							<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
							<span className="text-blue-500 text-xl"><Repeat /></span> Repetition
							</h3>

							<p className="text-sm text-gray-600 mt-2">
							Using the same words too often in your résumé can make it sound repetitive. 
							Try using <span className="font-semibold text-gray-800">synonyms</span> and 
							<span className="font-semibold text-gray-800"> active verbs</span> for better impact.
							</p>

							{/* Result Box */}
							<div className="mt-5 bg-blue-50 border border-blue-100 rounded-lg p-5 text-center">
							{(!feedback.resume.repeatedWords || feedback.resume.repeatedWords.length === 0) ? (
								<>
								<div className="flex justify-center mb-3">
									<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
									<span className="text-green-600 text-xl">✔</span>
									</div>
								</div>
								<p className="text-green-700 font-medium">Good job!</p>
								<p className="text-gray-700 text-sm">No frequently repeated words found in your résumé.</p>
								</>
							) : (
								<>
								<div className="flex justify-center mb-3">
									<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
									<span className="text-yellow-600 text-xl">⚠</span>
									</div>
								</div>
								<p className="text-yellow-700 font-medium">
									{feedback.resume.repeatedWords.length} repeated words found:
								</p>
								<ul className="list-disc text-left mx-auto mt-2 space-y-1 w-fit text-gray-700">
									{feedback.resume.repeatedWords.map((item, i) => (
									<li key={i}>{item}</li>
									))}
								</ul>
								</>
							)}
							</div>

							{/* FAQ Box */}
							<div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-4">
							<h4 className="text-sm font-semibold text-gray-800 mb-2">FAQ</h4>
							<p className="text-gray-700 text-sm leading-relaxed">
								<span className="font-semibold text-blue-600">Is repetition necessarily a bad thing?</span><br />
								It’s normal to repeat some terms in your résumé, but excessive repetition 
								can make it sound less engaging and reduce perceived vocabulary strength. 
								Try using synonyms for common verbs like <em>developed</em>, <em>created</em>, or <em>managed</em>.
							</p>
							</div>
						</div>
						)}
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
		{currentView === "pdf" && (
			<div className="flex bg-[#f6f6f7] w-full p-6  px-30 h-full">
				{fileUrl ? (
					<PDFViewer fileUrl={fileUrl} />
				) : (
				<div className="flex items-center justify-center h-full text-gray-500">
					<p>No résumé uploaded yet.</p>
				</div>
				)}
			</div> 
		)}
        
      	{/* <div className="flex bg-white w-1/2 p-6 h-full">
			{fileUrl ? (
				<PDFViewer fileUrl={fileUrl} />
			) : (
			<div className="flex items-center justify-center h-full text-gray-500">
				<p>No résumé uploaded yet.</p>
			</div>
			)}
		</div> */}
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