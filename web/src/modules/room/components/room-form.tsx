import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useCreateRoom } from "@/modules/room/hooks/use-create-room";
import { Checkbox } from "@/components/ui/checkbox";

export function RoomFormComponent() {
	const { createRoomForm, handleCreateRoom } = useCreateRoom();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Criar sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber
					respostas da I.A
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...createRoomForm}>
					<form
						className="flex flex-col gap-4"
						onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
					>
						<FormField
							control={createRoomForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome da sala</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Digite o nome da sala..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createRoomForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Descrição
										<span className="text-xs text-muted-foreground">
											(opcional)
										</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Digite o nome da sala..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={createRoomForm.control}
							name="isPublic"
							render={({ field }) => (
								<FormItem className="flex">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked) =>
												field.onChange(checked)
											}
										/>
									</FormControl>
									<FormLabel>Sala Pública</FormLabel>
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full cursor-pointer">
							Criar sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
