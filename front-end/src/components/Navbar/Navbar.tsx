import { useState, useEffect } from "react";
import { NavbarProfilePicture } from "../NavbarProfilePicture/NavbarProfilePicture";
import { ArchiveIcon } from "../svg/ArchiveIcon";
import { MessageIcon } from "../svg/MessageIcon";
import { PhoneIcon } from "../svg/PhoneIcon";
import { SettingsIcon } from "../svg/SettingsIcon";
import { StarIcon } from "../svg/StarIcon";
import { StatusIcon } from "../svg/StatusIcon";
import axios from "axios";

export const Navbar = () => {
  const [selectIcon, setSelectIcon] = useState(0);
  const [userProfilePicture, setUserProfilePicture] = useState<null | string>(
    null
  );
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const userId = "6508695537fe843f89aa8444";

  //LIDAR COM OS ERROS NESSE COMP E NO ADD PHOTO

  const fetchUserProfilePicture = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profilePicture/${userId}`
      );
      if (response.status >= 200 && response.status <= 305) {
        setUserProfilePicture(response.data.profilePicture);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfilePicture();
  }, []);

  const handlePhotoUpload = () => {
    fetchUserProfilePicture();
    setChangeProfilePicture(true);
  };

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
            <NavbarProfilePicture
              userProfilePicture={userProfilePicture}
              changeProfilePicture={changeProfilePicture}
              setChangeProfilePicture={setChangeProfilePicture}
              handlePhotoUpload={handlePhotoUpload}
            />
          </ul>
        </div>
      </nav>
    </aside>
  );
};
