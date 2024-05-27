import NavBar from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-teal-200 to-teal-500">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default Root;
