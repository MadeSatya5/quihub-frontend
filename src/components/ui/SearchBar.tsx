import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="bg-main-black my-5 mx-5 py-3 px-10 rounded-full w-[900px] flex gap-5">
      <Search />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white outline-none w-full"
      />
    </div>
  );
}

export default SearchBar;
