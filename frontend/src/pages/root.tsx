import NavBar from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default Root;
