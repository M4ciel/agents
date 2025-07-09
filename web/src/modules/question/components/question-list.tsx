import { useQuestion } from "../hooks/use-question";
import { QuestionItemComponent } from "./question-item";

interface QuestionListProps {
	roomId: string;
}

export function QuestionListComponent({ roomId }: QuestionListProps) {
	const { data, isLoading } = useQuestion(roomId);
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">
					Perguntas & Respostas
				</h2>
			</div>

			{isLoading && <p>Carregando...</p>}

			{data?.map((question) => (
				<QuestionItemComponent question={question} key={question.id} />
			))}
		</div>
	);
}
