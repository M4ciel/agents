import { Button } from "@/components/ui/button";
import { QuestionForm, QuestionItem } from "@/modules/question";
import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

type DetailRoomProps = {
	roomId: string;
};

export function DetailRoomPage() {
	const { roomId } = useParams<DetailRoomProps>();

	console.log(roomId);

	if (!roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="min-h-screen">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<Link to="/">
							<Button
								variant="outline"
								className="cursor-pointer"
							>
								<ArrowLeft className="mr-2 size-4" />
								Voltar ao Início
							</Button>
						</Link>
						<Link to={`/room/${roomId}/audio`}>
							<Button
								className="flex items-center gap-2 cursor-pointer"
								variant="secondary"
							>
								<Radio className="size-4" />
								Gravar Áudio
							</Button>
						</Link>
					</div>
					<h1 className="mb-2 font-bold text-3xl text-foreground">
						Sala de Perguntas
					</h1>
					<p className="text-muted-foreground">
						Faça perguntas e receba respostas com IA
					</p>
				</div>

				<div className="mb-8">
					<QuestionForm roomId={roomId} />
				</div>

				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="font-semibold text-2xl text-foreground">
							Perguntas & Respostas
						</h2>
					</div>

					<QuestionItem
						question={{
							id: "1",
							question: "Pergunta 1",
							createdAt: new Date().toISOString(),
						}}
					/>
				</div>
			</div>
		</div>
	);
}
