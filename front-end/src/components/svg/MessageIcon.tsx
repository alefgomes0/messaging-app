import { IconeProps } from "../../types/IconeProps";
import { useState } from "react";

export const MessageIcon = ({ width, height }: IconeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <li
      className={`rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
        isHovered ? "bg-neutral-500" : ""
      } transition-colors duration-100 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
      >
        <path
          fill="#e5e5e5"
          d="M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14Zm7.5-2.25c0 .414.336.75.75.75h7.5a.75.75 0 0 0 0-1.5h-7.5a.75.75 0 0 0-.75.75Zm.75 3.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"
        />
      </svg>
    </li>
  );
};
