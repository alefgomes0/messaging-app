import { IconeProps } from "../../types/IconeProps";
import { useState } from "react";

export const ArchiveIcon = ({ width, height }: IconeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <li
      className={`rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer ${
        isHovered ? "bg-neutral-500" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
      >
        <g fill="#e5e5e5">
          <path d="M4 3a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z" />
          <path
            fill-rule="evenodd"
            d="M3 8h14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm5 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
            clip-rule="evenodd"
          />
        </g>
      </svg>
    </li>
  );
};
