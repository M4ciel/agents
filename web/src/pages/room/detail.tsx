import {
	QuestionFormComponent,
	QuestionListComponent,
} from "@/modules/question";
import { Navigate, useParams } from "react-router-dom";
import { RoomLayout } from "./_layout";
import { HeaderComponent } from "@/components/header";

type DetailRoomProps = {
	roomId: string;
};

export function DetailRoomPage() {
	const { roomId } = useParams<DetailRoomProps>();

	if (!roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<RoomLayout>
			<HeaderComponent
				title="Sala de Perguntas"
				description="Faça perguntas e receba respostas com IA"
				roomId={roomId}
			/>
			<div className="mb-8">
				<QuestionFormComponent roomId={roomId} />
			</div>

			<QuestionListComponent roomId={roomId} />
		</RoomLayout>
	);
}
