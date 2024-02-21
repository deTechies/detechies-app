"use client";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";



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

  const changeLimit = (value: string) => {
    router.push(pathName + "?" + createQueryString("limit", value));
  };
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
    }
    
    const firstPage = () => {
        const page = 1;
        router.push(pathName + "?" + createQueryString("page", page.toString()));
    }
    
    const lastPage = () => {
        const page = Math.round(parseInt(total) / limit);
        router.push(pathName + "?" + createQueryString("page", page.toString()));
    }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {limit} of {total} items(s) displated.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-label_m">Show</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              changeLimit(value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {Math.round(parseInt(total) / limit) }
        </div>
        <div className="flex items-center space-x-2">
          <Button size="icon" className="hidden h-8 w-8 p-0 lg:flex"
            disabled={page === 1}
            onClick={firstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button size="icon" className="h-8 w-8 p-0"
           disabled={page === 1}
           onClick={prevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button size="icon" className="h-8 w-8 p-0"
          disabled={page >= Math.round(parseInt(total) / limit)}
          onClick={nextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button size="icon" className="hidden h-8 w-8 p-0 lg:flex"
            disabled={page >= Math.round(parseInt(total) / limit)}
            onClick={lastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
