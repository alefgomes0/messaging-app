import { CloseIcon } from "../svg/CloseIcon";
import { SearchIcon } from "../svg/SearchIcon";
import { useEffect, useRef, useState } from "react";

type SearchBarProps = {
  handleOnChange: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
};

export const SearchBar = ({ handleOnChange, searchValue }: SearchBarProps) => {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const divRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const onFocusOut = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) setInputOnFocus(false);
    };

    window.addEventListener("click", onFocusOut);
    return () => window.removeEventListener("click", onFocusOut);
  });

  return (
    <div ref={divRef} className="flex flex-col">
      <div className="flex items-center bg-zinc-700 rounded">
        <input
          onFocus={() => setInputOnFocus(true)}
          type="search"
          name="search"
          placeholder="Search a contact"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e.target.value)
          }
          value={searchValue}
          className={`w-full text-zinc-200 text-xs h-[27px] pl-1 border-none rounded outline-none placeholder:text-xs placeholder:text-zinc-200 bg-zinc-700 rounded`}
        />
        <button
          className="flex items-center justify-center cursor-auto hover:bg-zinc-500 w-6 h-6 rounded my-0.5 mx-1"
          onClick={() => {
            if (!searchValue) return;
            handleOnChange("");
          }}
        >
          {searchValue ? (
            <CloseIcon width={14} height={14} />
          ) : (
            <SearchIcon width={14} height={14} />
          )}
        </button>
      </div>
      <div
        className={`w-full h-0.5 ${
          inputOnFocus ? "bg-fuchsia-700" : "bg-zinc-500"
        }`}
      ></div>
    </div>
  );
};
