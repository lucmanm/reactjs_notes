import NavBar from "@/components/nav-bar";
import axiosInstance from "@/lib/axios-instance";
import { TUser } from "@/lib/type";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | null>(null);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };
  // get User info
  const getuser = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-teal-200 to-teal-500">
      <NavBar user={user} onLogout={handleLogout} />
      <Outlet />
    </main>
  );
};

export default RootLayout;
