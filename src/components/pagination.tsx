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
  const pages = getVisibleItems(props.totalPosts, Number(page) || 1);

  return (
    <div className="flex gap-2 w-100 justify-center">
      {pages.map((pageItem, index) => {
        const uri = `/${props.pageParam}${slug ? `/${slug}` : ""}/${pageItem}`;
        return (
          <Link
            className={!pageItem ? "pointer-events-none" : ""}
            key={pageItem ?? `${index}-null`}
            href={uri}
          >
            <PageButton pageIndex={pageItem} currentPage={page} />
          </Link>
        );
      })}
    </div>
  );
};

const getVisibleItems = (totalItems: number, currentPage: number) => {
  const maxVisiblePages = 5; // always show 5 pages
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  // show at least 5 pages, centered on the current page
  let firstVisiblePage = Math.max(
    1,
    currentPage - Math.floor(maxVisiblePages / 2)
  );
  let lastVisiblePage = Math.min(
    totalPages,
    firstVisiblePage + maxVisiblePages - 1
  );
  firstVisiblePage = Math.max(1, lastVisiblePage - maxVisiblePages + 1);

  const visibleItems = [];

  // always show first page
  if (currentPage !== 1) visibleItems.push(1);

  // show previous pages, unless already shown
  if (firstVisiblePage > 2) {
    visibleItems.push(null); // show truncated items
    visibleItems.push(currentPage - 2);
    visibleItems.push(currentPage - 1);
  } else {
    for (let i = 2; i < currentPage; i++) {
      visibleItems.push(i);
    }
  }

  // show current page
  visibleItems.push(currentPage);

  // show next pages, unless already shown
  if (lastVisiblePage < totalPages - 1) {
    visibleItems.push(currentPage + 1);
    visibleItems.push(currentPage + 2);
    visibleItems.push(null); // show truncated items
  } else {
    for (let i = currentPage + 1; i < totalPages; i++) {
      visibleItems.push(i);
    }
  }

  // always show last page
  if (currentPage !== totalPages) visibleItems.push(totalPages);

  return visibleItems;
};
