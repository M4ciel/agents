import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useRoomPagination } from "../hooks/use-room-pagination";

interface RoomPaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function RoomPagination({
	page,
	totalPages,
	onPageChange,
}: RoomPaginationProps) {
	const { paginationItems, hasPrevious, hasNext } = useRoomPagination({
		page,
		totalPages,
	});

	const handleClick =
		(newPage: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault();
			onPageChange(newPage);
		};

	return (
		<Pagination>
			<PaginationContent>
				{hasPrevious && (
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={handleClick(page - 1)}
						/>
					</PaginationItem>
				)}

				{paginationItems.map((item, index) => (
					<PaginationItem key={index}>
						{item === "..." ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								href="#"
								isActive={item === page}
								onClick={handleClick(item)}
							>
								{item}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem></PaginationItem>

				{hasNext && (
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={handleClick(page + 1)}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
