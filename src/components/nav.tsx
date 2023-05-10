"use client";

import { Rubik_Vinyl } from "next/font/google";
import Link from "next/link";
import NavDialog from "./nav-dialog";
import { Tag } from "@jogo/definitions";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

interface NavProps {
  tags: Tag[];
}

const Nav = ({ tags }: NavProps) => {
  return (
    <div className="w-full p-6">
      <nav className="flex justify-center items-center">
        <div className="flex flex-1 justify-center">
          <Link href="/">
            <div className={`px-2 text-3xl ${rubik.className} hover:scale-105`}>
              Jogo Bonito
            </div>
          </Link>
        </div>
        <NavDialog tags={tags} />
      </nav>
    </div>
  );
};

export default Nav;
