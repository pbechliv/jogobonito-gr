import React from "react";
import Link from "next/link";
import { Rubik_Vinyl } from "next/font/google";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

const Nav = ({ categories }: any) => {
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
          {categories.map((category: any) => {
            return (
              <div key={category.id} className="mx-1 p-2 max-md:hidden">
                <Link href={`/category/${category.attributes.slug}`}>
                  {category.attributes.name}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
