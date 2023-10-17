import { useUserContext } from "../../context/useUserContext";

export const EmojiIcon = () => {
  const { theme } = useUserContext();
  const fillColor = theme === "light" ? "#0e020d" : "#e4e4e4";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="relative"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Z" />
        <path d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2" />
        <path
          fill={fillColor}
          d="M15.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm-7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"
        />
      </g>
    </svg>
  );
};
