// src/components/protected-route.tsx
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthContext } from "@/contexts/auth/auth-context";

type ProtectedRouteProps = {
	children: JSX.Element;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { accessToken } = useAuthContext();

	if (!accessToken) {
		return <Navigate to="/signin" replace />;
	}

	return children;
}
