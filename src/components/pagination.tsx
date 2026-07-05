"use client";

import { PageParamEnum } from "@jogo/lib/page-param.enum";
import { PAGE_SIZE } from "@jogo/lib/page-size";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface PaginationProps {
  totalPosts: number;
  pageParam?: PageParamEnum;
}

export const Pagination = (props: PaginationProps) => {
  const { slug, page } = useParams();
  if (Array.isArray(page)) throw new Error("page should not be an array");

  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(props.totalPosts / PAGE_SIZE);
  const pages = getVisibleItems(props.totalPosts, currentPage);

  const buildUri = (p: number) =>
    `/${props.pageParam}${slug ? `/${slug}` : ""}/${p}`;

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Πλοήγηση σελίδων" className="flex flex-wrap gap-2 w-full justify-center items-center">
      {currentPage > 1 ? (
        <Link href={buildUri(currentPage - 1)} aria-label="Προηγούμενη σελίδα">
          <PageButton>
            <ChevronLeft className="h-4 w-4" />
          </PageButton>
        </Link>
      ) : (
        <PageButton disabled>
          <ChevronLeft className="h-4 w-4" />
        </PageButton>
      )}

      {pages.map((pageItem, index) => {
        if (pageItem === null) {
          return (
            <span key={`ellipsis-${index}`} className="hidden sm:block h-11 w-11 text-center leading-11 text-muted-foreground select-none">
              ...
            </span>
          );
        }
        const isActive = pageItem === currentPage;
        // On phones, keep only the current page and its direct neighbours
        const isFarFromCurrent = Math.abs(pageItem - currentPage) > 1;
        return (
          <Link
            key={pageItem}
            href={buildUri(pageItem)}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Σελίδα ${pageItem}`}
            className={isFarFromCurrent ? "hidden sm:block" : ""}
          >
            <PageButton active={isActive}>{pageItem}</PageButton>
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link href={buildUri(currentPage + 1)} aria-label="Επόμενη σελίδα">
          <PageButton>
            <ChevronRight className="h-4 w-4" />
          </PageButton>
        </Link>
      ) : (
        <PageButton disabled>
          <ChevronRight className="h-4 w-4" />
        </PageButton>
      )}
    </nav>
  );
};

function PageButton({
  children,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`
        h-11 w-11 flex items-center justify-center
        border rounded-md
        text-sm font-bold
        transition-colors
        ${active
          ? "bg-primary border-transparent text-primary-foreground"
          : disabled
            ? "border-border/50 text-muted-foreground/40 cursor-default"
            : "border-border text-foreground hover:bg-muted cursor-pointer"
        }
      `}
    >
      {children}
    </div>
  );
}

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
