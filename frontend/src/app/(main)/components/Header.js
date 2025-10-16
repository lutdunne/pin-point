import Link from "next/link";

export default function Header({setIsModalOpen}) {
    return (
        <header className="flex items-center justify-between h-12 md:h-16 px-6 bg-blue-900 text-white">
            <h1 className="text-lg font-bold">CV Analyzer</h1>
            <nav>
                <Link href="/Dashboard" className="mr-4">Home</Link>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-100 hover:text-gray-600 transition"
                >    
                    Re-score Resume
                </button>
            </nav>
        </header>
    );
}
