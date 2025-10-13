import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}