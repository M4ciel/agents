import { useEffect } from "react";
import type { User } from "@/contexts/auth/user";
import { API_URL } from "@/lib/utils";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
	const { accessToken, setAccessToken, setUser } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		const url = new URL(window.location.href);
		const token = url.searchParams.get("token");

		async function handleAuth() {
			if (token) {
				setAccessToken(token);

				url.searchParams.delete("token");
				window.history.replaceState({}, "", url.pathname);

				const response = await fetch(`${API_URL}/user?code=${token}`);

				if (!response.ok) {
					console.error(
						"Erro ao buscar dados do usuário:",
						response.status
					);
					return;
				}

				const userData: User = await response.json();
				setUser(userData);
			}
		}

		handleAuth();
	}, []);

	useEffect(() => {
		if (accessToken) {
			navigate("/", { replace: true });
		}
	}, [accessToken, navigate]);
}
