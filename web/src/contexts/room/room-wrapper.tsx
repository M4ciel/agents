import { Outlet } from "react-router-dom";
import { RoomProvider } from "./room-provider";
import { ProtectedRoute } from "@/components/protected-route";

export function RoomProviderWrapper() {
	return (
		<RoomProvider>
			<ProtectedRoute>
				<Outlet />
			</ProtectedRoute>
		</RoomProvider>
	);
}
