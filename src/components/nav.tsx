import React from "react";
import Link from "next/link";
import { Rubik_Vinyl } from "next/font/google";
import { useRouter } from "next/router";

const rubik = Rubik_Vinyl({
  weight: "400",
  subsets: ["latin"],
});

const Nav = () => {
  const router = useRouter();
  // const pages = [
  //   { name: "Αφιερώματα", slug: "afieromata" },
  //   { name: "Ποδόσφαιρο", slug: "podosfairo" },
  //   { name: "Μπάσκετ", slug: "mpasket" },
  // ];

  return (
    <div className="w-full p-4">
      <div>
        <nav className="flex justify-center">
          {/* <div className="flex flex-1 max-md:hidden"></div> */}
          <div className="flex flex-1 justify-center">
            <Link href="/">
              <div
                className={`p-2 text-3xl ${rubik.className} hover:scale-105`}
              >
                Jogo Bonito
              </div>
            </Link>
          </div>
          {/* <div className="flex flex-1 justify-end items-center max-md:hidden">
            {pages.map((page) => (
              <div
                key={page.slug}
                className={`mx-1 p-2 text-gray-700 hover:scale-105 ${
                  router.query.slug === page.slug
                    ? `underline decoration-yellow-200`
                    : ""
                }`}
              >
                <Link href={`/tag/${page.slug}`}>{page.name}</Link>
              </div>
            ))}
          </div> */}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
