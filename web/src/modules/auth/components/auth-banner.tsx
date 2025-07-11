import Illustration from "@/assets/illustration.svg?react";

export function AuthBannerComponent() {
	return (
		<div className="bg-violet-500 flex items-center justify-center">
			<div className="flex flex-col gap-3 items-start max-w-[28rem]">
				<Illustration />
				<h1 className="text-4xl font-bold text-zinc-100">
					Toda pergunta tem uma resposta.
				</h1>
				<p className="text-2xl text-zinc-100/80">
					Aprenda e compartilhe conhecimento com outras pessoas
				</p>
			</div>
		</div>
	);
}
