"use client";

import { Tag } from "@jogo/definitions";
import { sortAndPartitionTags } from "@jogo/lib/sort-tags";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Categories } from "./categories";
import { SocialLinks } from "./social-links";

interface NavDialogProps {
  tags: Tag[];
  className?: string;
}

export const NavDialog = (props: NavDialogProps) => {
  const tabNames = ["Βασικές", "Περισσότερα"];
  const { mainTags, secondaryTags } = sortAndPartitionTags(props.tags);

  return (
    <div className={props.className}>
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="secondary"
              className="cursor-pointer hover:bg-primary text-lg"
            />
          }
        >
          Κατηγορίες
          <ChevronRight className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent side="right" className="w-72 overflow-y-auto p-6">
          <SheetHeader className="p-0">
            <SheetTitle className="text-2xl">Κατηγορίες</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="main">
            <TabsList
              variant="line"
              activateOnFocus
              className="mt-2 flex w-full gap-4 justify-evenly"
            >
              {tabNames.map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={index === 0 ? "main" : "secondary"}
                  className="rounded-full text-lg px-2 py-1 w-36 bg-background data-active:bg-primary after:hidden"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="main" className="mt-2 overflow-y-auto">
              <Categories tags={mainTags} />
            </TabsContent>
            <TabsContent value="secondary" className="mt-2 overflow-y-auto">
              <Categories tags={secondaryTags} />
            </TabsContent>
          </Tabs>

          <div className="mt-auto pt-4 border-t border-border">
            <SocialLinks className="flex gap-6 justify-center" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
