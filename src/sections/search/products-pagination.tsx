"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

const ProductPagination = ({ totalPageSize }: { totalPageSize: number }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const currentPage = Number(searchParams.get("page"));

  const pageButtonsToRender = useMemo(() => {
    let AllPages = new Array(totalPageSize).fill(0).map((_, i) => i + 1);

    if (totalPageSize <= 10) return AllPages;

    let result: (number | string)[] = [];

    const renderCountInEnds =
      currentPage > totalPageSize / 4 && currentPage < (totalPageSize * 3) / 4
        ? 1
        : 3;

    const renderCountInMid = currentPage > totalPageSize / 4 ? 3 : 1;

    const startSection = AllPages.slice(0, renderCountInEnds);
    const endSection = AllPages.slice(-renderCountInEnds);

    const midSection: any =
      !startSection.includes(currentPage) && !endSection.includes(currentPage)
        ? AllPages.slice(currentPage - 1, currentPage - 1 + renderCountInMid)
        : AllPages.slice(
            totalPageSize / 2 - 1,
            totalPageSize / 2 - 1 + renderCountInMid,
          );

    result = [...startSection];

    if (startSection[startSection.length - 1] < midSection[0] - 1) {
      result.push("intialEllipsis");
    }

    result = [...result, ...midSection];

    if (midSection[midSection.length - 1] < endSection[0] - 1) {
      result.push("endEllipsis");
    }

    result = [...result, ...endSection];

    return Array.from(new Set(result));
  }, [currentPage, totalPageSize]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page + "");
    router.push("/search?" + params);
  };

  return (
    <Pagination className="my-10 w-full">
      <PaginationContent className="w-full">
        <PaginationItem
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className="w-24 justify-center rounded-md bg-ceramic"
        >
          <PaginationPrevious href="#" />
        </PaginationItem>

        <div className="flex flex-grow items-center justify-center gap-2">
          {pageButtonsToRender.map((val, idx) => {
            if (val === "intialEllipsis" || val === "endEllipsis")
              return <PaginationEllipsis />;

            return (
              <PaginationItem
                key={idx}
                onClick={() => handlePageChange(val as number)}
                className={cn({
                  "rounded-md bg-ceramic": currentPage === val,
                })}
              >
                <PaginationLink href="#">{val}</PaginationLink>
              </PaginationItem>
            );
          })}
        </div>

        <PaginationItem
          onClick={() => currentPage < totalPageSize  && handlePageChange(currentPage + 1)}
          className="flex w-24 justify-center rounded-md bg-ceramic"
        >
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
