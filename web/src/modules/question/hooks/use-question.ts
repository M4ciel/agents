import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { GetQuestionResponse } from "../types/get-question-response";

export function useQuestion(roomId: string) {
	return useQuery({
		queryKey: ["get-questions", roomId],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/questions/${roomId}`);
			const result: GetQuestionResponse = await response.json();

			return result;
		},
	});
}
