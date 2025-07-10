import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateRoomPage } from "./pages/room/create";
import { DetailRoomPage } from "./pages/room/detail";
import { RecordRoomPage } from "./pages/room/record";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Routes>
						<Route element={<CreateRoomPage />} index />
						<Route
							element={<DetailRoomPage />}
							path="/room/:roomId"
						/>
						<Route
							element={<RecordRoomPage />}
							path="/room/:roomId/audio"
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
