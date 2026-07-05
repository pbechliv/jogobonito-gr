"use client";

import { Tag } from "@jogo/definitions";
import { sortAndPartitionTags } from "@jogo/lib/sort-tags";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
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

  const { mainTags, secondaryTags } = useMemo(
    () => sortAndPartitionTags(props.tags),
    [props.tags]
  );

  if (mainTags.length === 0 && secondaryTags.length === 0) return null;

  const linkClassName =
    "font-display font-bold uppercase tracking-wide text-sm hover:text-secondary hover:underline decoration-primary decoration-2 underline-offset-4";

  return (
    <div className={props.className}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        {mainTags.map((tag) => (
          <Link key={tag.slug} href={`/tag/${tag.slug}/1`} className={linkClassName}>
            {tag.name}
          </Link>
        ))}

        {secondaryTags.length > 0 && (
          <Popover open={isSecondaryOpen} onOpenChange={setIsSecondaryOpen}>
            <PopoverTrigger
              openOnHover
              delay={0}
              closeDelay={150}
              render={
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 cursor-pointer ${linkClassName}`}
                />
              }
            >
              Περισσότερα
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isSecondaryOpen ? "rotate-180" : ""
                }`}
              />
            </PopoverTrigger>

            <PopoverContent
              className="w-[min(32rem,80vw)] max-h-96 overflow-auto p-2"
              initialFocus={false}
            >
              <div className="grid grid-cols-2 gap-1 text-base">
                {secondaryTags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}/1`}
                    className="block rounded-lg px-3 py-2 hover:bg-accent hover:underline decoration-primary underline-offset-4"
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
  );
};
