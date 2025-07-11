import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";

export function useBackendHealth() {
	const [isBackendOnline, setIsBackendOnline] = useState(false);

	useEffect(() => {
		const check = async () => {
			try {
				const res = await fetch(`${API_URL}/health`);
				if (!res.ok) throw new Error("Backend offline");
				setIsBackendOnline(true);
			} catch (err) {
				setIsBackendOnline(false);
			}
		};

		check();
	}, []);

	return { isBackendOnline };
}
