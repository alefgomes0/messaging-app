import { useEffect, useRef, useState } from "react";
import { EditIcon } from "../svg/EditIcon";

export const NavbarProfilePicture = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [editName, setEditName] = useState(false);
  const [inputValue, setInputValue] = useState("Name");

  const listRef = useRef<HTMLLIElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const displayMenu = (e: MouseEvent) => {
      if (showMenu && !listRef.current?.contains(e.target as Node))
        setShowMenu(false);
    };

    const displayInput = (e: MouseEvent) => {
      if (editName && !divRef.current?.contains(e.target as Node))
        setEditName(false);
    };

    window.addEventListener("click", displayMenu);
    window.addEventListener("click", displayInput);

    return () => {
      window.removeEventListener("click", displayMenu);
      window.removeEventListener("click", displayInput);
    };
  }, [showMenu, editName]);

  return (
    <li
      ref={listRef}
      className={`w-[40px] h-[40px] rounded-full rounded-lg  flex items-center justify-center cursor-pointer hover:bg-neutral-700 } transition-colors duration-100 ease-in-out`}
    >
      {showMenu ? (
        <div className="fixed left-1 bottom-1 z-10 grid grid-cols-1 auto-rows-min gap-y-6 w-96 h-[450px] bg-neutral-700 px-3 pt-12 rounded-md cursor-auto">
          <div className="w-[75px] h-[75px] rounded-full bg-sky-900"></div>
          <div className="flex items-center justify-between text-neutral-200" ref={divRef}>
            {editName ? (
              <input
                type="text"
                name="name"
                value={inputValue}
                className="border-none outline-none bg-neutral-800 w-64 h-8 pl-1 rounded"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
            ) : (
              <h3 className="text-xl font-semibold">Name</h3>
            )}
            <div className="hover:bg-neutral-800 p-1 rounded" onClick={() => {
              setEditName(!editName)
              inputRef.current?.focus()
            }}>
              <EditIcon width={16} height={16} />
            </div>
          </div>
          <div className="flex flex-col justify-between text-neutral-200">
            <p className="text-sm opacity-70">User email</p>
            <p className="font-semibold">someemail@.com</p>
          </div>
          <button className="w-max h-min bg-fuchsia-700 text-fuchsia-50 px-8 py-1.5 rounded-md shadow-[0_2px_2px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.15)_inset]">
            Save Changes
          </button>
        </div>
      ) : (
        <div
          className="w-[25px] h-[25px] rounded-full bg-sky-900"
          onClick={() => setShowMenu(true)}
        ></div>
      )}
    </li>
  );
};
