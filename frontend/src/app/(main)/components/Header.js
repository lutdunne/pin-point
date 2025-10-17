import Link from "next/link";
import { FileUp } from 'lucide-react';
import Switch from '@mui/material/Switch';
import ThemeSwitch from "./ThemeSwitch";
import { Pin } from "lucide-react";




export default function Header({setIsModalOpen}) {
    return (
        <header className="flex items-center justify-between h-8 md:h-12 px-6 bg-[#011627] text-white">
            <div className="flex">
                <Pin />
                <h1 className="text-lg font-bold">PinPoint</h1>
            </div>
            <nav className="flex items-center space-x-4">
               <ThemeSwitch />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#e67b77] transition"
                >    
                    Re-score
                    <FileUp className="w-4 h-4" />
                </button>
            </nav>
        </header>
    );
}
