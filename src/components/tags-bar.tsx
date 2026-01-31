"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Tag } from "@jogo/definitions";
import { MAIN_TAG_NAMES_SORTED } from "@jogo/lib/main-tag-names-sorted";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface TagsBarProps {
  tags: Tag[];
  className?: string;
}

export const TagsBar = ({ tags, className }: TagsBarProps) => {
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

  const { mainTags, secondaryTags } = useMemo(() => {
    const tagOrder = new Map<string, number>(
      MAIN_TAG_NAMES_SORTED.map((name, index) => [name, index])
    );

    const mainTags = tags
      .filter((tag) => tag.isMain)
      .sort(
        (a, b) =>
          (tagOrder.get(a.name) ?? Number.POSITIVE_INFINITY) -
          (tagOrder.get(b.name) ?? Number.POSITIVE_INFINITY)
      );

    const secondaryTags = tags
      .filter((tag) => !tag.isMain)
      .sort((a, b) => a.name.localeCompare(b.name, "el"));

    return { mainTags, secondaryTags };
  }, [tags]);

  if (mainTags.length === 0 && secondaryTags.length === 0) return null;

  return (
    <div className={className}>
      <div className="bg-yellow-100 rounded-lg px-4 py-3">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-lg">
          {mainTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}/1`}
              className="hover:underline decoration-yellow-300"
            >
              {tag.name}
            </Link>
          ))}

          {secondaryTags.length > 0 && (
            <div
              className="relative"
              onMouseEnter={openSecondary}
              onMouseLeave={closeSecondarySoon}
            >
              <button
                type="button"
                onClick={() => setIsSecondaryOpen((v) => !v)}
                className="inline-flex items-center gap-2 hover:underline decoration-yellow-300"
                aria-expanded={isSecondaryOpen}
                aria-controls="secondary-tags"
              >
                Περισσότερα
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isSecondaryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSecondaryOpen && (
                <div
                  id="secondary-tags"
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-[min(32rem,80vw)] max-h-96 overflow-auto rounded-xl bg-white shadow-xl ring-1 ring-black/10 p-2 z-50"
                  onMouseEnter={openSecondary}
                  onMouseLeave={closeSecondarySoon}
                >
                  <div className="grid grid-cols-2 gap-1 text-base">
                    {secondaryTags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/tag/${tag.slug}/1`}
                        className="block rounded-lg px-3 py-2 hover:bg-yellow-50 hover:underline decoration-yellow-300"
                        onClick={() => setIsSecondaryOpen(false)}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
