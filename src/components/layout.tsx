import { Categories } from "./categories";
import Nav from "./nav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "greek"] });

const Layout = ({ children, tags }: any) => (
  <>
    <Nav />
    <main
      className={`pb-10 ${inter.className} m-auto max-w-4xl grid gap-1 max-sm:grid-cols-1 md:grid-cols-[3fr_1fr]`}
    >
      <div>{children}</div>
      <Categories className={"max-md:hidden"} tags={tags} />
    </main>
  </>
);

export default Layout;
