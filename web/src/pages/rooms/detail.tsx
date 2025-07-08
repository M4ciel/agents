import { Navigate, useParams } from "react-router-dom";

export function DetailRoomPage() {
	const { id } = useParams();

	if (!id) {
		return <Navigate replace to="/" />;
	}

	return <div className="text-zinc-50">Detail Room {id}</div>;
}
