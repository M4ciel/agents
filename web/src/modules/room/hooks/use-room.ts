import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { GetRoomResponse } from "../types/get-room-response";

export function useRoom() {
	return useQuery({
		queryKey: ["get-rooms"],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/rooms`);
			const result: GetRoomResponse = await response.json();

			return result;
		},
	});
}
