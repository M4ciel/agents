import { createContext, useContext } from "react";
import type { User } from "./user";

type AuthContextType = {
	accessToken: string | null;
	user: User | null;
	setUser: (user: User) => void;
	setAccessToken: (token: string) => void;
	signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
}
