type Room = {
	id: string;
	name: string;
	questionsCount: number;
	isPublic: boolean;
	userId: string;
	createdAt: string;
};

export type GetRoomResponse = {
	info: {
		page: number;
		itemsPerPage: number;
		totalPages: number;
	};
	data: Room[];
};
