import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoomPage } from "./pages/room/create";
import { DetailRoomPage } from "./pages/room/detail";
import { SignInAuth } from "./pages/auth/signin";
import { RecordRoomPage } from "./pages/room/record";
import { RoomProviderWrapper } from "./contexts/room/room-wrapper";
import { AuthProvider } from "./contexts/auth/auth-provider";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route element={<SignInAuth />} path="/signin" />
							<Route element={<RoomProviderWrapper />}>
								<Route element={<CreateRoomPage />} index />
								<Route
									element={<DetailRoomPage />}
									path="/room/:roomId"
								/>
								<Route
									element={<RecordRoomPage />}
									path="/room/:roomId/audio"
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
