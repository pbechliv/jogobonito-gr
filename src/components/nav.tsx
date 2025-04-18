import { Tag } from "@jogo/definitions";
import { Rubik_Vinyl } from "next/font/google";
import Link from "next/link";
import { NavDialog } from "./nav-dialog";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

interface NavProps {
  tags: Tag[];
}

export const Nav = ({ tags }: NavProps) => {
  return (
    <div className="w-full p-4">
      <nav className="flex justify-center items-center">
        <div className="max-lg:w-8 lg:w-32"></div>
        <div className="flex flex-1 justify-center">
          <Link href="/">
            <div
              className={`px-2 py-2 max-lg:text-4xl lg:text-6xl text-black-300 ${rubik.className} hover:scale-105 bg-yellow-100 rounded-lg`}
            >
              Jogo Bonito
            </div>
          </Link>
        </div>
        <NavDialog tags={tags} />
      </nav>
    </div>
  );
};
