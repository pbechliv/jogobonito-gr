import React from "react";
import Link from "next/link";
import { Rubik_Vinyl } from "next/font/google";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

const Nav = () => {
  return (
    <div className="w-full bg-blue-600 bg-opacity-40 p-4 shadow-md">
      <div>
        <nav className="flex justify-center">
          <Link href="/">
            <div
              className={`p-2 text-xl ${rubik.className} bg-yellow-200 rounded-lg hover:scale-105`}
            >
              Jogo Bonito
            </div>
          </Link>
          <div key={"afieromata"} className="mx-1 p-2 max-md:hidden">
            <Link href={`/tag/afieromata`}>Αφιερώματα</Link>
          </div>
          <div key={"podosfairo"} className="mx-1 p-2 max-md:hidden">
            <Link href={`/tag/podosfairo`}>Ποδόσσφαιρο</Link>
          </div>
          <div key={"mpasket"} className="mx-1 p-2 max-md:hidden">
            <Link href={`/tag/mpasket`}>Μπάσκετ</Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
