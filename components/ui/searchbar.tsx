import { IoSearchOutline } from "react-icons/io5";
import Input from "./inputs";

export default function Searchbar() {
  return (
    <div className="relative ">
      <Input placeholder="Search Campaign" className="pr-4 h-[32px]" />
      <IoSearchOutline className="absolute right-2 top-2" />
    </div>
  );
}
