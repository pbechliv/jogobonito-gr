import { Tag } from "@jogo/definitions";
import { Footer } from "./footer";
import { Header } from "./header";

interface LayoutProps {
  tags: Tag[];
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Header tags={props.tags} />
    <main className="w-full max-w-6xl mx-auto px-4 pt-6 pb-10 flex-1">
      {props.children}
    </main>
    <Footer tags={props.tags} />
  </div>
);
