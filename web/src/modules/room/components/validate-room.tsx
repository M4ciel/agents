import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValidateRoom } from "../hooks/use-enter-room";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

export function ValidateRoom() {
	const { validateRoomForm, handleValidateRoom, isSubmitting } = useValidateRoom();

	return (
		<Form {...validateRoomForm}>
			<form
				className="flex gap-2"
				onSubmit={validateRoomForm.handleSubmit(handleValidateRoom)}
			>
				<FormField
					control={validateRoomForm.control}
					name="roomCode"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Digite o código da sala"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isSubmitting}>Entrar na sala</Button>
			</form>
		</Form>
	);
}
