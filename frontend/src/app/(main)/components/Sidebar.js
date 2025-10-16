"use client";

import Link from "next/link";
import { MessagesSquare, Target, FileChartLine } from "lucide-react";

export default function Sidebar ({ setCurrentView}) {
    return (

        <nav className="flex flex-col bg-white justify-center items-start p-8 space-y-4 text-gray-900 whitespace-nowrap">
            <p className="text-gray-600">Tools</p>
            {/* <Link href="/ScoreMyCV" style={{ marginRight: '1rem' }}>
                Score my cv
            </Link>
            <Link href="/ScoreMyCV" style={{ marginRight: '1rem' }}>
                Target my cv
            </Link>
            <Link href="/interview-practice" style={{ marginRight: '1rem' }}>
                Interview practice
            </Link> */}
            
            <button
                onClick={() => setCurrentView("interview")}
                className="flex items-center gap-x-2 rounded hover:bg-blue-100 hover:text-blue-600 transition"
            >
                <MessagesSquare className="w-5 h-5" />
                Interview Practice 
            </button>
            <button 
                onClick={() => setCurrentView("target")}
                className="flex items-center gap-x-2 rounded hover:bg-blue-100 hover:text-blue-600 transition"

            >
                <Target className="w-5 h-5" />
                Target My CV
            </button>
            <button 
                onClick={() => setCurrentView("resume")}
                className="flex items-center gap-x-2 rounded hover:bg-blue-100 hover:text-blue-600 transition"

            >
                <FileChartLine className="w-5 h-5" />
                Score My CV
            </button>  
        </nav>
    );
}