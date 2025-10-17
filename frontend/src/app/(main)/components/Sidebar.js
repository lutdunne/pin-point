"use client";

import Link from "next/link";
import { useView } from "./ViewContext";
import { MessagesSquare, Target, FileChartLine, Pin } from "lucide-react";


export default function Sidebar () {
    const { currentView, setCurrentView } = useView();

    return (

        <nav className="flex flex-col w-73 bg-[#f6f6f7] border-[#0D2137] shadow-md p-4 space-y-4 whitespace-nowrap">
            
            {/* Top logo section */}
            <div className="flex justify-center items-center">
                <Pin className="text-[#e67b77]"/>
                <h1 className="text-lg font-bold">PinPoint</h1>
            </div>
            <div className="w-45 border-b border-[#e2e2e3] mb-6 mx-auto" />
            {/* Tools section */}
            <div className="flex flex-col pl-15 justify-center items-start space-y-3">
                <p className="text-black font-semibold hover:text-[#e67b77] transition">Tools</p>
                <button
                    onClick={() => setCurrentView("interview")}
                    className="flex text-[#67676c] font-semibold items-center gap-x-2 rounded hover:text-gray-700 transition"
                >
                    <MessagesSquare className="w-4 h-4" />
                    Interview Practice 
                </button>
                <button 
                    onClick={() => setCurrentView("target")}
                    className="flex text-[#67676c] font-semibold items-center gap-x-2 rounded hover:text-gray-700 transition"

                >
                    <Target className="w-4 h-4" />
                    Target My CV
                </button>
                <button 
                    onClick={() => setCurrentView("resume")}
                    className="flex text-[#67676c] font-semibold items-center gap-x-2 rounded hover:text-gray-700 transition"

                >
                    <FileChartLine className="w-4 h-4" />
                    Score My CV
                </button>
            </div>
        </nav>
    );
}