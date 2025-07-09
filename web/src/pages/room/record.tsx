import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

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

	if (!roomId) {
		return <Navigate replace to="/" />;
	}

	function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData();

		formData.append("file", audio, "audio.webm");

		const response = await fetch(`${API_URL}/question/${roomId}/audio`, {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		console.log(result);
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
	return (
		<div className="h-screen flex flex-col gap-3 items-center justify-center">
			{isRecording ? (
				<Button className="cursor-pointer" onClick={stopRecording}>
					Parar Gravacao
				</Button>
			) : (
				<Button className="cursor-pointer" onClick={startRecording}>
					Gravar audio
				</Button>
			)}
			{isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
		</div>
	);
}
