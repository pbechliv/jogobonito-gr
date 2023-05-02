import Nav from "./nav";

const Layout = ({ children }: any) => (
  <>
    <Nav />
    <div className="pt-4 max-w-3xl m-auto">{children}</div>
  </>
);

export default Layout;
