import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RoomLayout } from "./_layout";
import { HeaderComponent } from "@/components/header";

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

type RecordRoomProps = {
	roomId: string;
};

export function RecordRoomPage() {
	const { roomId } = useParams<RecordRoomProps>();
	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	if (!roomId) {
		return <Navigate replace to="/" />;
	}

	function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData();

		formData.append("file", audio, "audio.webm");

		const response = await fetch(`${API_URL}/questions/${roomId}/audio`, {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		console.log(result);
	}

	function createRecorder(audio: MediaStream) {
		recorder.current = new MediaRecorder(audio, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64_000,
		});

		recorder.current.ondataavailable = (event) => {
			if (event.data.size > 0) {
				uploadAudio(event.data);
			}
		};

		recorder.current.onstart = () => {
			console.log("Gravacao iniciada");
		};

		recorder.current.onstop = () => {
			console.log("Gravacao encerrada/pausada");
		};

		recorder.current.start();
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("O seu navegador nao suporta gravacao");
			return;
		}
		setIsRecording(true);

		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44_100,
			},
		});

		createRecorder(audio);

		intervalRef.current = setInterval(() => {
			recorder.current?.stop();

			createRecorder(audio);
		}, 5000);
	}
	return (
		<RoomLayout>
			<HeaderComponent title="Gravação de Áudio" />
			<div className="flex-1 flex flex-col gap-3 items-center justify-center">
				{isRecording ? (
					<Button
						className="cursor-pointer"
						variant="destructive"
						onClick={stopRecording}
					>
						Parar Gravacao
					</Button>
				) : (
					<Button className="cursor-pointer" onClick={startRecording}>
						Gravar audio
					</Button>
				)}
			</div>
		</RoomLayout>
	);
}
