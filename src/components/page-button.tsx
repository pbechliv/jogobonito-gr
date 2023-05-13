"use client";

interface PageButtonProps {
  pageIndex: number | null;
  currentPage: string;
}

export const PageButton = ({ pageIndex, currentPage }: PageButtonProps) => {
  const isActive =
    pageIndex === Number(currentPage) || (pageIndex === 1 && !currentPage);
  return (
    <div
      className={`
        h-10 w-10
        text-center
      text-slate-700 
        border-2
        rounded-full
        p-1
        leading-7
        ${isActive ? `bg-yellow-200 border-slate-700` : `border-yellow-200`}
        ${!pageIndex ? `pointer-events-none` : ``}
      `}
    >
      {pageIndex ?? `...`}
    </div>
  );
};
