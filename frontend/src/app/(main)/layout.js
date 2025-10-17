"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ViewProvider } from "./components/ViewContext";

export default function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  


  return (
    <ViewProvider>
		<div className="flex h-screen text-[#3c3c43]">
			{/* Sidebar now controls the view */}
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header setIsModalOpen={setIsModalOpen} />
				{children}
			</div>
			
			

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
	</ViewProvider>
  );
}