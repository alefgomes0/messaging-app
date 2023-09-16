import { useState } from "react";

export const NavbarProfilePicture = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`w-[40px] h-[40px] rounded-full rounded-lg  flex items-center justify-center cursor-pointer ${
        isHovered ? "bg-neutral-500" : ""
      } transition-colors duration-100 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[25px] h-[25px] rounded-full bg-sky-900"></div>
    </li>
  );
};
