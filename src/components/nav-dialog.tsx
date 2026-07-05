"use client";

import { Tag } from "@jogo/definitions";
import { sortAndPartitionTags } from "@jogo/lib/sort-tags";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface NavDialogProps {
  tags: Tag[];
  className?: string;
}

export const NavDialog = (props: NavDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mainTags, secondaryTags } = sortAndPartitionTags(props.tags);
  const closeSheet = () => setIsOpen(false);

  return (
    <div className={props.className}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Κατηγορίες"
              className="size-11 cursor-pointer"
            />
          }
        >
          <Menu className="size-6" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex w-80 max-w-[85vw] flex-col gap-0 p-0"
        >
          <SheetHeader className="flex-row items-center gap-3 border-b border-border p-4">
            <Logo variant="mark" className="h-7 w-7 text-foreground" />
            <SheetTitle className="font-display text-lg font-extrabold uppercase tracking-wide">
              Κατηγορίες
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="flex flex-col divide-y divide-border">
              {mainTags.map((tag) => (
                <li key={tag.slug}>
                  <Link
                    href={`/tag/${tag.slug}/1`}
                    onClick={closeSheet}
                    className="group flex items-center justify-between py-3.5 font-display text-2xl font-extrabold tracking-tight transition-colors hover:text-secondary"
                  >
                    {tag.name}
                    <ChevronRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>

            {secondaryTags.length > 0 && (
              <div className="mt-8">
                <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  Περισσότερα
                </p>
                <ul className="grid grid-cols-2 gap-x-4">
                  {secondaryTags.map((tag) => (
                    <li key={tag.slug}>
                      <Link
                        href={`/tag/${tag.slug}/1`}
                        onClick={closeSheet}
                        className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {tag.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>

          <div className="border-t border-border p-4">
            <SocialLinks className="flex justify-center gap-6" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
