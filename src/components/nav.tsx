import React from "react";
import Link from "next/link";
import { Rubik_Vinyl } from "next/font/google";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

const Nav = () => {
  return (
    <div className="w-full p-4">
      <div>
        <nav className="flex justify-center">
          <div className="flex flex-1 justify-center">
            <Link href="/">
              <div
                className={`p-2 text-3xl ${rubik.className} hover:scale-105`}
              >
                Jogo Bonito
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
