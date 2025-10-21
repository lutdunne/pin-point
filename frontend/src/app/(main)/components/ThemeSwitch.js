"use client"

import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center transition-all duration-300"
    >
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : ""
        }`}
      >
        {isDark ? (
          <Moon className="text-gray-800" size={16} />
        ) : (
          <Sun className="text-yellow-500" size={16} />
        )}
      </span>
    </button>
  );
} 