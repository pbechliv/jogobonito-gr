import { Tag } from "@jogo/definitions";
import { Footer } from "./footer";
import { Nav } from "./nav";

interface LayoutProps {
  tags: Tag[];
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Nav tags={props.tags} />
    <main className={`pb-10 m-auto max-w-4xl flex-1`}>{props.children}</main>
    <Footer />
  </div>
);
