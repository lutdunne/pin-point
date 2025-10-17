import Link from "next/link";
import { FileUp } from 'lucide-react';
import ToggleSwitch from "./ToggleSwitch";



export default function Header({setIsModalOpen}) {
    return (
        <header className="flex items-center justify-between h-8 md:h-12 px-6 bg-[#011627] text-white">
            <h1 className="text-lg font-bold">CV Analyzer</h1>
            <nav className="flex items-center space-x-4">
               

                <Link href="/Dashboard" className="">Home</Link>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2  hover:bg-gray-100 hover:text-gray-600 transition"
                >    
                    Re-score Resume
                    <FileUp className="w-4 h-4" />
                </button>
            </nav>
        </header>
    );
}
