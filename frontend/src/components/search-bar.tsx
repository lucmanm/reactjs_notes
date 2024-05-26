import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="w-1/2 relative">
      <Input
      value="text"
        type="search"
        placeholder="Search Note"
        className=" text-sm pr-2"
      />
      {/* <Search className="absolute right-2 top-1.5 text-slate-200 hover:text-slate-950 hover:cursor-pointer" /> */}
    </div>
  );
}
