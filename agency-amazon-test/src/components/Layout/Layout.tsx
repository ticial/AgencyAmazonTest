import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="container py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
