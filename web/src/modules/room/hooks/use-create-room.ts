import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	createRoomSchema,
	type CreateRoomFormData,
} from "../types/create-room-body";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/utils";
import type { CreateRoomsResponse } from "../types/create-room-response";
import { useAuthContext } from "@/contexts/auth/auth-context";

export function useCreateRoom() {
	const { user } = useAuthContext();
	const queryClient = useQueryClient();

	const createRoomForm = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: "",
			description: "",
			isPublic: true,
			userId: user!.id,
		},
	});

	async function handleCreateRoom({
		name,
		description,
		isPublic,
		userId,
	}: CreateRoomFormData) {
		await createRoom({ name, description, isPublic, userId });
		createRoomForm.reset();
	}

	const { mutateAsync: createRoom } = useMutation({
		mutationFn: async (data: CreateRoomFormData) => {
			const response = await fetch(`${API_URL}/rooms`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: CreateRoomsResponse = await response.json();

			return result;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-rooms"] });
		},
	});

	return { createRoomForm, handleCreateRoom };
}
