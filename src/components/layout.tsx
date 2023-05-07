import { Tag } from "@jogo/definitions";
import { Inter } from "next/font/google";
import { Categories } from "./categories";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin", "greek"] });

interface LayoutProps {
  tags: Tag[];
  children: React.ReactNode;
}

const Layout = ({ children, tags }: LayoutProps) => (
  <>
    <Nav />
    <main
      className={`pb-10 ${inter.className} m-auto max-w-4xl grid gap-1 max-sm:grid-cols-1 md:grid-cols-[3fr_1fr]`}
    >
      <div>{children}</div>
      <Categories tags={tags} />
    </main>
  </>
);

export default Layout;
