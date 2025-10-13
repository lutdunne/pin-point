import Link from "next/link";

export default function Sidebar () {
    return (

        <nav className="flex flex-col bg-white justify-center  p-4 text-gray-900">
            <p>Tools</p>
            <Link href="/ScoreMyCV" style={{ marginRight: '1rem' }}>
                Score my cv
            </Link>
            <Link href="/ScoreMyCV" style={{ marginRight: '1rem' }}>
                Target my cv
            </Link>
            <Link href="/ScoreMyCV" style={{ marginRight: '1rem' }}>
                Interview practice
            </Link>
        </nav>
    );
}