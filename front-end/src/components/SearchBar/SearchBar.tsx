import { CloseIcon } from "../svg/CloseIcon";
import { SearchIcon } from "../svg/SearchIcon";
import { useEffect, useRef, useState } from "react";

type SearchBarProps = {
  handleOnChange: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  inputPlaceholder: string;
};

export const SearchBar = ({
  handleOnChange,
  searchValue,
  inputPlaceholder,
}: SearchBarProps) => {
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const divRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const onFocusOut = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) setInputOnFocus(false);
    };

    window.addEventListener("click", onFocusOut);
    return () => window.removeEventListener("click", onFocusOut);
  }, []);

  return (
    <div ref={divRef} className="flex flex-col px-3">
      <div className="flex items-center bg-neutral-100 dark:bg-[#333] rounded">
        <input
          onFocus={() => setInputOnFocus(true)}
          type="search"
          name="search"
          placeholder={inputPlaceholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e.target.value)
          }
          value={searchValue}
          className={`w-full text-zinc-800 dark:text-zinc-200 text-xs h-[27px] pl-1 border-none rounded outline-none placeholder:text-xs placeholder:text-zinc-800 dark:placeholder:text-zinc-200 placeholder:opacity-[75%] bg-neutral-100 dark:bg-[#333] rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.3)_inset]`}
        />
        <button
          className="flex items-center justify-center cursor-auto bg-neutral-100 dark:bg-[#333] hover:bg-neutral-200 dark:hover:bg-[#494949] w-6 h-6 rounded my-0.5 mx-1"
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
        className={`rounded w-full h-[1.5px] ${
          inputOnFocus ? "bg-fuchsia-700" : "bg-neutral-400 dark:bg-neutral-600"
        }`}
      ></div>
    </div>
  );
};
