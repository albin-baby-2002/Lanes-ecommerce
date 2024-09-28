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
import React from "react";

const ProductPagination = ({ totalPageSize }: { totalPageSize: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page + "");
    router.push("/search?" + params, { scroll: false });
  };
  return (
    <Pagination className="mb-10 w-full">
      <PaginationContent className="w-full">
        <PaginationItem className="w-24 justify-center rounded-md bg-ceramic">
          <PaginationPrevious href="#" />
        </PaginationItem>

        <div className="flex flex-grow items-center justify-center gap-2">
          {new Array(totalPageSize).fill(0).map((_val, idx) => {
            return (
              <PaginationItem
                onClick={() => handlePageChange(idx + 1)}
                className={cn({
                  "rounded-md bg-ceramic":
                    Number(searchParams.get("page")) === idx + 1,
                })}
              >
                <PaginationLink href="#">{idx + 1}</PaginationLink>
              </PaginationItem>
            );
          })}
        </div>

        <PaginationItem className="flex w-24 justify-center rounded-md bg-ceramic">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
