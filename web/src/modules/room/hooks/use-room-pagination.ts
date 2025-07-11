interface useRoomPaginationProps {
	page: number;
	totalPages: number;
}

type PaginationItem = number | "...";

export function useRoomPagination({
	page,
	totalPages,
}: useRoomPaginationProps) {
	const paginationItems: PaginationItem[] = [];

	if (totalPages <= 5) {
		for (let index = 1; index <= totalPages; index++) {
			paginationItems.push(index);
		}
	} else {
		paginationItems.push(1);

		if (page > 3) paginationItems.push("...");

		for (
			let index = Math.max(2, page - 1);
			index <= Math.min(totalPages - 1, page + 1);
			index++
		) {
			paginationItems.push(index);
		}

		if (page < totalPages - 2) paginationItems.push("...");

		paginationItems.push(totalPages);
	}

	const hasPrevious = page > 1;
	const hasNext = page < totalPages;

	return { paginationItems, hasPrevious, hasNext };
}
