import HeaderClient from "./components/HeaderClient";
import { getServerSession } from "next-auth"
import Sidebar from "./components/Sidebar";
import { ViewProvider } from "./components/ViewContext";


export default function MainLayout({ children }) {
	return (
		<ViewProvider>
			<div className="flex h-screen text-[#3c3c43]">
				{/* Sidebar now controls the view */}
				<Sidebar />
				<div className="flex flex-col flex-1">
					<HeaderClient>{children}</HeaderClient>
				</div>
			</div>
		</ViewProvider>
  );
}