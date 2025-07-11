import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInFormData } from "../types/signin-body";
import { useState } from "react";

export function useSignIn() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const signInForm = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			roomCode: "",
		},
	});

	async function handleSignIn({ roomCode }: SignInFormData) {
		setIsLoading(true);
		signInForm.reset();
	}

	return { signInForm, handleSignIn, isLoading };
}
