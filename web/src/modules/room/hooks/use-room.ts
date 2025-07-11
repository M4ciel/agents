import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomResponse } from "../types/get-room-response";
import { useAuthContext } from "@/contexts/auth/auth-context";
import { useState } from "react";

export function useRoom(isPublic: boolean) {
	const { user } = useAuthContext();
	const [page, setPage] = useState(1);

	const { data, isLoading } = useQuery({
		queryKey: ["get-rooms", isPublic ? "public" : "private", page],
		queryFn: async () => {
			const response = await fetch(
				`${API_URL}/rooms/${user?.id}?isPublic=${isPublic}&page=${page}`
			);
			const result: GetRoomResponse = await response.json();
			return result;
		},
	});

	return {
		data,
		isLoading,
		page,
		setPage,
	};
}
