"use client";

import { useState } from "react";
import Header from "./Header";
import  SessionProvider  from "./SessionProvider";

export default function HeaderClient({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SessionProvider>
      <Header setIsModalOpen={setIsModalOpen} />
      {children}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </SessionProvider>
  );
}