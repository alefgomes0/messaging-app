import { useState } from "react";

type SearchBarProps = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

export const SearchBar = ({ handleOnChange, searchValue }: SearchBarProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`border-b-2 ${
        isSelected ? "border-fuchsia-700" : "border-zinc-500"
      } rounded`}
    >
      <input
        type="search"
        placeholder="Search a contact"
        onChange={handleOnChange}
        value={searchValue}
        className="w-full text-zinc-200 text-xs h-6 pl-1 border-none outline-none placeholder:text-xs placeholder:text-zinc-200 bg-zinc-700 rounded"
      />
    </div>
  );
};
