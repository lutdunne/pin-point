"use client";

import { useState, useEffect } from "react";

export default function LoadingPage() {
  const [notes] = useState([
    "Please wait...",
    "Loading your resume...",
    "Parsing your resume...",
    "Identifying core sections...",
    "Evaluating your work experience...",
    "Analyzing resume depth...",
    "Finishing up...",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // short delay before animation starts
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < notes.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 2500);
      return () => clearInterval(interval);
    }, 600); // wait 0.6s before starting

    return () => clearTimeout(startDelay);
  }, [notes.length]);

  // 🧠 if we're on the first note, only show one
  const visibleNotes =
    currentIndex === 0
      ? [notes[0]]
      : notes.slice(
          Math.max(0, currentIndex - 1),
          Math.min(notes.length, currentIndex + 2)
        );

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#f9fafb] text-gray-800">
      <ul className="flex flex-col items-center justify-center space-y-3">
        {visibleNotes.map((note, i) => {
          const realIndex =
            currentIndex === 0 ? 0 : currentIndex - 1 + i;
          const isActive = realIndex === currentIndex;

          return (
            <li
              key={realIndex}
              className={`transition-all duration-1000 ease-in-out text-center ${
                isActive
                  ? "text-2xl font-bold scale-125 opacity-100 text-gray-900"
                  : "text-lg opacity-40 scale-100 text-gray-500"
              }`}
            >
              {note}
            </li>
          );
        })}
      </ul>
    </div>
  );
}