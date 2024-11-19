interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    if (totalPages <= 7) return range(1, totalPages);

    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    const leftPart = showLeftEllipsis ? [1, '...'] : range(1, 7);
    const middlePart =
      showLeftEllipsis && showRightEllipsis
        ? range(currentPage - 2, currentPage + 2)
        : [];
    const rightPart = showRightEllipsis
      ? ['...', totalPages]
      : range(totalPages - 4, totalPages);

    return [...leftPart, ...middlePart, ...rightPart];
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
      >
        ←
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100'
          } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};
