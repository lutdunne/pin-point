import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between h-12 md:h-16 px-6 bg-blue-900 text-white">
            <h1 className="text-lg font-bold">CV Analyzer</h1>
            <nav>
                <Link href="/Dashboard" className="mr-4">Home</Link>
                <button>
                    Re-score Resume
                </button>
            </nav>
        </header>
    );
}
