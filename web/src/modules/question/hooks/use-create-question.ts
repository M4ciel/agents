import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	createQuestionSchema,
	type CreateQuestionFormData,
} from "../types/create-question-body";

export function useCreateQuestion(roomId: string) {
	const form = useForm<CreateQuestionFormData>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: "",
		},
	});

	function handleCreateQuestion(data: CreateQuestionFormData) {
		// biome-ignore lint/suspicious/noConsole: dev
		console.log(data, roomId);
	}

	return { form, handleCreateQuestion };
}
