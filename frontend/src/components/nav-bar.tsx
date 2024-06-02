import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getInitials } from "@/lib/helper";
import { LogInIcon } from "lucide-react";
import { TUser } from "@/lib/type";

export default function NavBar({ user, onLogout }: { user: TUser | null; onLogout: () => void }) {
  const navigate = useNavigate();

  const onClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <section className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to="/">
        <h2 className="text-xl font-bold py-2 text-teal-500">Note App</h2>
      </Link>
      <SearchBar />
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <div className="h-5 w-5">{getInitials(user?.fullName)}</div>

                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="*:cursor-pointer">
              <DropdownMenuLabel className="text-xs">{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LogInIcon size={42} className="rounded-full border p-2 cursor-pointer" />
        )}
      </div>
    </section>
  );
}
