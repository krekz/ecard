"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

interface PaginationProps {
  total: number;
  currentPage?: number;
  perPage?: number;
}

const Pagination = ({ total, currentPage, perPage = 12 }: PaginationProps) => {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(total / perPage);
    const pagesArray: string[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i.toString());
    }
    setPages(pagesArray);
  }, [total, perPage]);

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
      <div
        className="hidden items-center justify-between sm:flex"
        aria-label="Pagination"
      >
        {currentPage && currentPage > 1 && (
          <Link
            href={`/catalog?page=${currentPage - 1}`}
            className="hover:text-indigo-600 flex items-center gap-x-2"
          >
            {/* SVG for Previous */}
            Previous
          </Link>
        )}
        <ul className="flex items-center gap-1">
          {pages.map((page) => (
            <li key={page} className="text-sm">
              <Link
                href={`/catalog?page=${page}`}
                aria-current={currentPage === Number(page) ? "page" : undefined}
                className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                  currentPage === Number(page)
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : ""
                }`}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
        {currentPage && currentPage < pages.length && (
          <Link
            href={`/catalog?page=${currentPage + 1}`}
            className="hover:text-indigo-600 flex items-center gap-x-2"
          >
            Next
            {/* SVG for Next */}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
