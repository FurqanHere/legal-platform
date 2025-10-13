import React from 'react';

const Paginator = ({ page, rows, totalRecords, onPageChange }) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / rows);

  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous Page */}
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Number Buttons */}
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${page === pageNumber ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next Page */}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
