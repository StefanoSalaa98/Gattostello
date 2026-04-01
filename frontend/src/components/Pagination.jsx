import "../css/Pagination.css"

export default function Pagination({ page, totalPages, setSearchParams }) {
    const pages = [];

    // Mostriamo max 5 pagine vicine alla corrente
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    const handleClick = (p) => setSearchParams({ page: p });

    return (
        <div className="pagination-container">
            <button
                disabled={page === 1}
                onClick={() => handleClick(page - 1)}
                className="prev-next-btn"
            >
                «
            </button>

            {start > 1 && (
                <>
                    <button onClick={() => handleClick(1)}>1</button>
                    {start > 2 && <span className="dots">...</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => handleClick(p)}
                    className={p === page ? "active" : ""}
                >
                    {p}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="dots">...</span>}
                    <button onClick={() => handleClick(totalPages)}>{totalPages}</button>
                </>
            )}

            <button
                disabled={page === totalPages}
                onClick={() => handleClick(page + 1)}
                className="prev-next-btn"
            >
                »
            </button>
        </div>
    );
}