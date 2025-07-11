import { useAuthContext } from "@/contexts/auth/auth-context";
import type { User } from "@/contexts/auth/user";
import { API_URL } from "@/lib/utils";
import { AuthLayout, SignInFormComponent } from "@/modules/auth/components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SignInAuth() {
	const { accessToken, setAccessToken, setUser, user } = useAuthContext();
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

	return (
		<AuthLayout>
			<SignInFormComponent />
		</AuthLayout>
	);
}
