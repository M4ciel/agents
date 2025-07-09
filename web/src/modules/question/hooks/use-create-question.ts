import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createQuestionSchema,
	type CreateQuestionFormData,
} from "../types/create-question-body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/lib/utils";
import type { CreateQuestionResponse } from "../types/create-question-response";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();
	const createQuestionForm = useForm<CreateQuestionFormData>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: "",
		},
	});

	async function handleCreateQuestion({ question }: CreateQuestionFormData) {
		await createQuestion({ question });
		createQuestionForm.reset();
	}

	const { mutateAsync: createQuestion } = useMutation({
		mutationFn: async (data: CreateQuestionFormData) => {
			const response = await fetch(`${API_URL}/questions/${roomId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: CreateQuestionResponse = await response.json();

			return result;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-questions", roomId],
			});
		},
	});

	return { createQuestionForm, handleCreateQuestion };
}
