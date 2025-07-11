import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import type { User } from "./user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [accessToken, setAccessTokenState] = useState<string | null>(null);
	const [user, setUserState] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const user = localStorage.getItem("user");
		if (token) setAccessTokenState(token);
		if (user) setUser(JSON.parse(user));
	}, []);

	function setUser(user: User) {
		setUserState(user);
		localStorage.setItem("user", JSON.stringify(user));
	}

	function setAccessToken(token: string) {
		setAccessTokenState(token);
		localStorage.setItem("accessToken", token);
	}

	function signOut() {
		setAccessTokenState(null);
		localStorage.removeItem("accessToken");
	}

	return (
		<AuthContext.Provider
			value={{ accessToken, setAccessToken, user, setUser, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}
