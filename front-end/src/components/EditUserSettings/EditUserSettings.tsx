import { axiosPrivate } from "../../api/axios";
import { useEffect, useRef, useState } from "react";
import { EditIcon } from "../svg/EditIcon";
import { AddPhoto } from "../AddPhoto/AddPhoto";
import { EditUsername } from "../EditUsername/EditUsername";
import { useAuthContext } from "../../context/useAuthContext";

type EditUserSettingsProps = {
  userProfilePicture: string | null;
  changeProfilePicture: boolean;
  setChangeProfilePicture: React.Dispatch<React.SetStateAction<boolean>>;
  handlePhotoUpload: () => void;
};

export const EditUserSettings = ({
  userProfilePicture,
  handlePhotoUpload,
}: EditUserSettingsProps) => {
  const { auth, setAuth } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const [editName, setEditName] = useState(false);
  const [inputValue, setInputValue] = useState(auth.name);
  const listRef = useRef<HTMLLIElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const displayMenu = (e: MouseEvent) => {
      if (e.target === buttonRef.current) {
        setShowMenu(false);
        return;
      }
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

  useEffect(() => {
    if (editName) inputRef.current?.focus();
  }, [editName]);

  const handleNameChange = async () => {
    if (inputValue === auth.name) return;

    try {
      const response = await axiosPrivate.put("/user", {
        userId: auth.id,
        newName: inputValue,
      });
      if (response.data.success) {
        setAuth((prev) => ({
          ...prev,
          name: inputValue,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveChanges = async () => {
    await Promise.all([handleNameChange(), handlePhotoUpload()]);
  };

  return (
    <li
      ref={listRef}
      className={`w-[40px] h-[40px] rounded-full rounded-lg  flex items-center justify-center cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-100 ease-in-out`}
      onClick={() => setShowMenu(true)}
    >
      {showMenu ? (
        <div className="fixed left-0 bottom-0 z-10 grid grid-cols-1 auto-rows-min gap-y-6 w-96 h-[450px] bg-zinc-400 dark:bg-neutral-700 px-3 pt-4 rounded-md cursor-auto">
          {userProfilePicture ? (
            <img
              src={userProfilePicture}
              alt="user profile picture"
              className="w-[75px] h-[75px] rounded-full"
            />
          ) : (
            <div className="w-[75px] h-[75px] rounded-full bg-sky-900"></div>
          )}
          <AddPhoto />
          <div
            className="flex items-center justify-between text-neutral-200"
            ref={divRef}
          >
            {editName ? (
              <EditUsername
                inputRef={inputRef}
                inputValue={inputValue}
                setInputValue={setInputValue}
                username={auth.name}
              />
            ) : (
              <h3 className="text-neutral-800 dark:text-neutral-100 text-xl font-semibold opacity-90">
                {inputValue}
              </h3>
            )}
            <button
              className="hover:bg-neutral-300 dark:hover:bg-[#333] p-1 rounded"
              onClick={() => {
                setEditName(!editName);
              }}
            >
              <EditIcon width={20} height={20} />
            </button>
          </div>
          <div className="flex flex-col justify-between text-neutral-200">
            <p className="text-sm text-neutral-800 dark:text-neutral-100 opacity-80 dark:opacity-70">
              User email
            </p>
            <p className="text-neutral-800 dark:text-neutral-100 font-semibold opacity-90">
              {auth.email}
            </p>
          </div>
          <button
            className="w-max h-min bg-fuchsia-700 text-fuchsia-50 px-8 py-1.5 rounded-md shadow-[0_2px_2px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.15)_inset]"
            ref={buttonRef}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div onClick={() => setShowMenu(true)}>
          {userProfilePicture ? (
            <img
              src={userProfilePicture}
              alt="user profile picture"
              className="w-[25px] h-[25px] rounded-full"
            />
          ) : (
            <div className="w-[25px] h-[25px] rounded-full bg-sky-900"></div>
          )}
        </div>
      )}
    </li>
  );
};
