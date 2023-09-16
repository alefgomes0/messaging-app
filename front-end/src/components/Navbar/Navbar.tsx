import { useState } from "react";
import { NavbarProfilePicture } from "../NavbarProfilePicture/NavbarProfilePicture";
import { ArchiveIcon } from "../svg/ArchiveIcon";
import { MessageIcon } from "../svg/MessageIcon";
import { PhoneIcon } from "../svg/PhoneIcon";
import { SettingsIcon } from "../svg/SettingsIcon";
import { StarIcon } from "../svg/StarIcon";
import { StatusIcon } from "../svg/StatusIcon";

export const Navbar = () => {
  const [selectIcon, setSelectIcon] = useState(0);

  return (
    <aside className="w-12 h-[calc(100dvh-48px)] grid grid-rows-2 grid-cols-1 bg-neutral-800 col-start-1 col-end-2 row-start-2 row-end-3">
      <nav className="w-full h-[calc(100dvh-48px)] grid">
        <div className="w-full mt-2">
          <ul className="flex flex-col items-center justify-center gap-0.5">
            <MessageIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
            <PhoneIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
            <StatusIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
          </ul>
        </div>
        <div className="w-full self-end mb-2">
          <ul className="flex flex-col items-center justify-center gap-0.5">
            <StarIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
            <ArchiveIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
            <SettingsIcon
              width={20}
              height={20}
              selectIcon={selectIcon}
              setSelectIcon={setSelectIcon}
            />
            <NavbarProfilePicture />
          </ul>
        </div>
      </nav>
    </aside>
  );
};