import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";
import {
	validateRoomSchema,
	type ValidateRoomFormData,
} from "../types/validate-room-body";
import { useNavigate } from "react-router-dom";
import type { ValidateRoomResponse } from "../types/validate-room.response";
import { useRoomContext } from "@/contexts/room/room-context";

export function useValidateRoom() {
	const { setRoomId } = useRoomContext();
	const navigate = useNavigate();
	const validateRoomForm = useForm<ValidateRoomFormData>({
		resolver: zodResolver(validateRoomSchema),
		defaultValues: {
			roomCode: "",
		},
	});

	async function handleValidateRoom({ roomCode }: ValidateRoomFormData) {
		await validateRoom({ roomCode });
		validateRoomForm.reset();
	}

	const { mutateAsync: validateRoom } = useMutation({
		mutationFn: async (data: ValidateRoomFormData) => {
			const response = await fetch(`${API_URL}/rooms/validate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: ValidateRoomResponse = await response.json();

			return result;
		},

		onSuccess: ({ isValid, roomId }) => {
			if (isValid) {
				setRoomId(roomId);
				navigate(`/room/${roomId}`);
			}
		},
	});

	const { isSubmitting } = validateRoomForm.formState;

	return { validateRoomForm, handleValidateRoom, isSubmitting };
}
