"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      <Header setIsModalOpen={setIsModalOpen} />  {/* Pass control down */}
      <main className="flex overflow-hidden h-screen">{children}</main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4" >Upload Resume</h2>
            <button
              onClick={() => setIsModalOpen(false)}  /* Close modal */
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}