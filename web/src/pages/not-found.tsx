// src/pages/NotFoundPage.tsx
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/modules/auth/components";
import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<AuthLayout>
			<div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-3">
				<h1 className="text-5xl font-bold text-primary">404</h1>
				<p className="text-xl text-zinc-700 mb-4">
					Página não encontrada.
				</p>
				<Link to="/">
					<Button>Voltar para a página inicial</Button>
				</Link>
			</div>
		</AuthLayout>
	);
}
