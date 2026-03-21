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
      text-muted-foreground
        border-2
        rounded-full
        p-1
        leading-7
        hover:bg-secondary
        ${isActive ? `bg-primary border-foreground` : `border-primary`}
        ${!pageIndex ? `pointer-events-none` : ``}
      `}
    >
      {pageIndex ?? `...`}
    </div>
  );
};
