import { Tag } from "@jogo/definitions";
import { Footer } from "./footer";
import { Nav } from "./nav";

interface LayoutProps {
  tags: Tag[];
  children: React.ReactNode;
}

export const Layout = ({ children, tags }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Nav tags={tags} />
    <main className={`pb-10 m-auto max-w-4xl flex-1`}>{children}</main>
    <Footer />
  </div>
);
