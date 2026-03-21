"use client";

import { PageParamEnum } from "@jogo/lib/page-param.enum";
import { PAGE_SIZE } from "@jogo/lib/page-size";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageButton } from "./page-button";

interface PaginationProps {
  totalPosts: number;
  pageParam?: PageParamEnum;
}

export const Pagination = (props: PaginationProps) => {
  const { slug, page } = useParams();
  if (Array.isArray(page)) throw new Error("page should not be an array");

  const currentPage = page ?? "1";
  const pages = getVisibleItems(props.totalPosts, Number(currentPage) || 1);

  return (
    <div className="flex gap-2 w-full justify-center">
      {pages.map((pageItem, index) => {
        if (pageItem === null) {
          return (
            <span key={`ellipsis-${index}`}>
              <PageButton pageIndex={null} currentPage={currentPage} />
            </span>
          );
        }
        const uri = `/${props.pageParam}${slug ? `/${slug}` : ""}/${pageItem}`;
        return (
          <Link key={pageItem} href={uri}>
            <PageButton pageIndex={pageItem} currentPage={currentPage} />
          </Link>
        );
      })}
    </div>
  );
};

const getVisibleItems = (
  totalItems: number,
  currentPage: number
): (number | null)[] => {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  if (totalPages <= 1) return [1];

  const windowSize = 5;
  let windowStart = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const windowEnd = Math.min(totalPages, windowStart + windowSize - 1);
  windowStart = Math.max(1, windowEnd - windowSize + 1);

  const items: (number | null)[] = [];

  if (windowStart > 1) {
    items.push(1);
    if (windowStart > 2) items.push(null);
  }

  for (let i = windowStart; i <= windowEnd; i++) {
    items.push(i);
  }

  if (windowEnd < totalPages) {
    if (windowEnd < totalPages - 1) items.push(null);
    items.push(totalPages);
  }

  return items;
};
