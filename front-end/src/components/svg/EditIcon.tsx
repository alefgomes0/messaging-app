import { IconeProps } from "../../types/IconeProps";
import { useUserContext } from "../../context/useUserContext";

export const EditIcon = ({ width, height }: IconeProps) => {
  const { theme } = useUserContext();
  const fillColor = theme === "light" ? "#0e020d" : "#e4e4e4";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={fillColor}
        d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"
      />
    </svg>
  );
};
