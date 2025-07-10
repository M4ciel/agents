import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createQuestionSchema,
	type CreateQuestionFormData,
} from "../types/create-question-body";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/lib/utils";
import type { CreateQuestionResponse } from "../types/create-question-response";
import type { GetQuestionResponse } from "../types/get-question-response";

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

		onMutate: ({ question }) => {
			const questions = queryClient.getQueryData<GetQuestionResponse>([
				"get-questions",
				roomId,
			]);

			const questionsArray = questions ?? [];

			const newQuestion = {
				id: crypto.randomUUID(),
				question,
				answer: null,
				createdAt: new Date().toISOString(),
				isGeneratingAnswer: true,
			};

			queryClient.setQueryData<GetQuestionResponse>(
				["get-questions", roomId],
				[newQuestion, ...questionsArray]
			);

			return { newQuestion, questions };
		},

		onSuccess: (data, _variables, context) => {
			queryClient.setQueryData<GetQuestionResponse>(
				["get-questions", roomId],
				(questions) => {
					if (!questions || !context.newQuestion) {
						return questions;
					}
					return questions.map((question) => {
						if (question.id === context.newQuestion.id) {
							return {
								...context.newQuestion,
								id: data.id,
								answer: data.answer,
								createdAt: data.createdAt,
								isGeneratingAnswer: false,
							};
						}
						return question;
					});
				}
			);
		},

		onError: (_error, _variables, context) => {
			if (context?.questions) {
				queryClient.setQueryData<GetQuestionResponse>(
					["get-questions", roomId],
					context.questions
				);
			}
		},
	});

	const { isSubmitting } = createQuestionForm.formState;

	return { createQuestionForm, handleCreateQuestion, isSubmitting };
}
