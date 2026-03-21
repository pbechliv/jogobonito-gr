import { Tag } from "@jogo/definitions";
import { Rubik_Vinyl } from "next/font/google";
import Link from "next/link";
import { NavDialog } from "./nav-dialog";
import { TagsBar } from "./tags-bar";
import { ThemeToggle } from "./theme-toggle";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

interface NavProps {
  tags: Tag[];
}

export const Nav = (props: NavProps) => {
  return (
    <div className="w-full p-4 pb-0">
      <nav className="flex flex-col items-center gap-2 md:gap-4">
        <div className="w-full flex justify-center items-center">
          <div className="flex-1" />
          <Link href="/">
            <div
              className={`px-2 py-2 max-lg:text-4xl lg:text-6xl ${rubik.className} hover:scale-105 bg-secondary rounded-lg`}
            >
              Jogo Bonito
            </div>
          </Link>
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </div>

        <NavDialog tags={props.tags} className="md:hidden" />
        <TagsBar tags={props.tags} className="hidden md:block w-full max-w-4xl" />
      </nav>
    </div>
  );
};
