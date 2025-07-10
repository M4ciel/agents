import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "../hooks/use-create-question";

interface QuestionFormProps {
	roomId: string;
}

export function QuestionFormComponent({ roomId }: QuestionFormProps) {
	const { createQuestionForm, handleCreateQuestion, isSubmitting } =
		useCreateQuestion(roomId);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma Pergunta</CardTitle>
				<CardDescription>
					Digite sua pergunta abaixo para receber uma resposta gerada
					por I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...createQuestionForm}>
					<form
						className="flex flex-col gap-4"
						onSubmit={createQuestionForm.handleSubmit(
							handleCreateQuestion
						)}
					>
						<FormField
							control={createQuestionForm.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua Pergunta</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[100px]"
											disabled={isSubmitting}
											placeholder="O que você gostaria de saber?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="cursor-pointer"
						>
							Enviar pergunta
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
