import Link from "next/link";
import { FileUp } from 'lucide-react';
import Switch from '@mui/material/Switch';
import ThemeSwitch from "./ThemeSwitch";
import { useView } from "./ViewContext";






export default function Header({setIsModalOpen}) {
    const { currentView, setCurrentView } = useView();

    return (
        <header className="flex items-center justify-end border-b border-[#e2e2e3] h-12 md:h-17 px-6 bg-[#ffffff]">
            
            <nav className="flex items-center space-x-4">

                <button
                    onClick={() => {
                        if (currentView === "pdf") {
                            setCurrentView("resume");
                        } else {
                            setCurrentView("pdf");
                        }
                    }}
                    className="hover:text-[#e67b77] transition"
                >
                    {currentView === "pdf" ? "View Feedback" : "View PDF"}
                </button>
                <ThemeSwitch />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2  hover:text-[#e67b77] transition"
                >    
                    Re-score
                    <FileUp className="w-4 h-4" />
                </button>
            </nav>
        </header>
    );
}


