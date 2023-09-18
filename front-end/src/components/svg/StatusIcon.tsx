import { IconeProps } from "../../types/IconeProps";
import { useState } from "react";

export const StatusIcon = ({
  width,
  height,
  selectIcon,
  setSelectIcon,
}: IconeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
        selectIcon === 2 ? "bg-neutral-700 opacity-70" : ""
      } ${
        isHovered ? "bg-neutral-500" : ""
      } transition-colors duration-100 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setSelectIcon(2)}
    >
      <div
        className={`w-4 h-[16px] rounded absolute left-0 top-50 border-l-4 border-l-fuchsia-500 ${
          selectIcon === 2
            ? "animate-[borderIn_3s_ease-in-out]"
            : "animate-[borderOut_1s_ease-in-out] opacity-0"
        }`}
      ></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
      >
        <path
          fill="#e5e5e5"
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 1.3 4.935l-1.249 3.749a1 1 0 0 0 1.265 1.265l3.749-1.25A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 6c-.902 0-1.731.297-2.4.8a1 1 0 1 1-1.2-1.6a6 6 0 0 1 8.4 8.4a1 1 0 0 1-1.598-1.2A4 4 0 0 0 12 8zm-5 3a1 1 0 0 1 1 1a4 4 0 0 0 4 4a1 1 0 1 1 0 2a6 6 0 0 1-6-6a1 1 0 0 1 1-1zm5-1a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"
          clipRule="evenodd"
        />
      </svg>
    </li>
  );
};
