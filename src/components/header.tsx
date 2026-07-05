"use client";

import { Tag } from "@jogo/definitions";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { NavDialog } from "./nav-dialog";
import { TagsBar } from "./tags-bar";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  tags: Tag[];
}

export const Header = (props: HeaderProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsScrolled(!entry.isIntersecting),
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />
      <header
        data-scrolled={isScrolled || undefined}
        className="group sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur transition-shadow duration-200 data-[scrolled]:shadow-md"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 transition-[height] duration-200 md:h-16 md:group-data-[scrolled]:h-14">
          <Link href="/" aria-label="Αρχική σελίδα" className="shrink-0">
            <Logo className="h-6 w-auto text-foreground transition-[height] duration-200 md:h-8 md:group-data-[scrolled]:h-7" />
          </Link>

          <TagsBar tags={props.tags} className="hidden min-w-0 flex-1 md:block" />

          <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
            <ThemeToggle />
            <NavDialog tags={props.tags} className="md:hidden" />
          </div>
        </div>
      </header>
    </>
  );
};
