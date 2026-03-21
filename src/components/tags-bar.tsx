"use client";

import { Tag } from "@jogo/definitions";
import { sortAndPartitionTags } from "@jogo/lib/sort-tags";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface TagsBarProps {
  tags: Tag[];
  className?: string;
}

export const TagsBar = (props: TagsBarProps) => {
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openSecondary = () => {
    clearCloseTimer();
    setIsSecondaryOpen(true);
  };

  const closeSecondarySoon = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsSecondaryOpen(false);
      closeTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  const { mainTags, secondaryTags } = useMemo(
    () => sortAndPartitionTags(props.tags),
    [props.tags]
  );

  if (mainTags.length === 0 && secondaryTags.length === 0) return null;

  return (
    <div className={props.className}>
      <div className="bg-secondary rounded-lg px-4 py-3">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-lg">
          {mainTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}/1`}
              className="hover:underline decoration-ring"
            >
              {tag.name}
            </Link>
          ))}

          {secondaryTags.length > 0 && (
            <Popover open={isSecondaryOpen} onOpenChange={setIsSecondaryOpen}>
              <div
                onMouseEnter={openSecondary}
                onMouseLeave={closeSecondarySoon}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setIsSecondaryOpen((v) => !v)}
                    className="inline-flex items-center gap-2 hover:underline decoration-ring cursor-pointer"
                    aria-expanded={isSecondaryOpen}
                  >
                    Περισσότερα
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isSecondaryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </PopoverTrigger>
              </div>

              <PopoverContent
                className="w-[min(32rem,80vw)] max-h-96 overflow-auto p-2"
                onMouseEnter={openSecondary}
                onMouseLeave={closeSecondarySoon}
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-2 gap-1 text-base">
                  {secondaryTags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}/1`}
                      className="block rounded-lg px-3 py-2 hover:bg-accent hover:underline decoration-ring"
                      onClick={() => setIsSecondaryOpen(false)}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
