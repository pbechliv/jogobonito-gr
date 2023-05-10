import { Tag } from "@jogo/definitions";
import Nav from "./nav";

interface LayoutProps {
  tags: Tag[];
  children: React.ReactNode;
}

const Layout = ({ children, tags }: LayoutProps) => (
  <div>
    <Nav tags={tags} />
    <main className={`pb-10 m-auto max-w-4xl grid gap-1`}>
      <div>{children}</div>
    </main>
  </div>
);

export default Layout;
