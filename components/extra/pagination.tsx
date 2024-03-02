"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Pagination({
  total,
  limit,
  page,
}: {
  total: string;
  limit: number;
  page: number;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const nextPage = () => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string) + 1
      : 2;

    router.push(pathName + "?" + createQueryString("page", page.toString()));
  };

  const prevPage = () => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string) - 1
      : 1;
    router.push(pathName + "?" + createQueryString("page", page.toString()));
  };

  const goToPage = (page: number) => {
    router.push(pathName + "?" + createQueryString("page", page.toString()));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-2 gap-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {limit} of {total} items.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <PaginationPage
            page={page}
            total={total.toString()}
            limit={limit}
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      </div>
    </div>
  );
}

export interface PaginationPagesProps {
  page: number;
  total: string;
  limit: number;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export function PaginationPage({
  page,
  total,
  limit,
  goToPage,
  prevPage,
  nextPage,
}: PaginationPagesProps) {
  const numPages = Math.ceil(parseInt(total) / limit);
  const pageNumbers = [] as any;

  for (let i = 1; i <= numPages; i++) {
    // Always add the first and last pages
    if (i === 1 || i === numPages || i === page) {
      pageNumbers.push(i);
      // If the page is near the start
    } else if (i < 4 && page < 5) {
      pageNumbers.push(i);
      // If the page is near the end
    } else if (i > numPages - 3 && page > numPages - 4) {
      pageNumbers.push(i);
      // Add ellipsis and surrounding pages
    } else if (i >= page - 1 && i <= page + 1) {
      pageNumbers.push(i);
      // Add single ellipsis placeholders
    } else if (i === page - 2 || i === page + 2) {
      pageNumbers.push("...");
    }
  }

  // Remove duplicate ellipsis
  const filteredPageNumbers = pageNumbers.filter(
    (item: string, pos: number) => {
      return (
        item !== "..." || (item === "..." && pageNumbers[pos - 1] !== "...")
      );
    }
  );

  return (
    <div className="flex items-center space-x-2">
      <button
        className="h-8 w-8 p-0 text-text-secondary"
        disabled={page === 1}
        onClick={prevPage}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon />
      </button>

      <div className="rounded-md p-1 flex items-center gap-2 text-gray-600">
        {filteredPageNumbers.map((pageNum: any, index: number) =>
          pageNum === "..." ? (
            <span
              key={index}
              className="h-8 w-8 rounded-[6px] flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => goToPage(pageNum)}
              className={`h-8 w-8 rounded-[6px] ${
                page === pageNum ? "bg-blue-500 text-white" : ""
              }`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      <button
        className="h-8 w-8 p-0 text-gray-400"
        disabled={page >= numPages}
        onClick={nextPage}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon />
      </button>
    </div>
  );
}
