import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoomPage } from "./pages/room/create";
import { DetailRoomPage } from "./pages/room/detail";
import { SignInAuth } from "./pages/auth/signin";
import { NewRoomAuth } from "./pages/auth/new-room";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route element={<SignInAuth />} path="/signin" />
						<Route element={<NewRoomAuth />} path="/new-room" />
						<Route element={<CreateRoomPage />} index />
						<Route
							element={<DetailRoomPage />}
							path="/room/:roomId"
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
