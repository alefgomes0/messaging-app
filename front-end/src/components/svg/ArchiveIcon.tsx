import { IconeProps } from "../../types/IconeProps";
import { useUserContext } from "../../context/useUserContext";

export const ArchiveIcon = ({
  width,
  height,
  selectIcon,
  setSelectIcon,
}: IconeProps) => {
  const { theme } = useUserContext();
  const fillColor = theme === "light" ? "#0e020d" : "#e4e4e4";

  return (
    <li
      className={`relative rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 ${
        selectIcon === 4
          ? "bg-zinc-400 dark:bg-neutral-700 opacity-70"
          : "bg-zinc-200 dark:bg-neutral-800"
      }  transition-colors duration-100 ease-in-out`}
      onClick={() => {
        if (!setSelectIcon) return;
        setSelectIcon(3);
      }}
    >
      <div
        className={`w-4 h-4 rounded absolute left-0 top-50 border-l-4 border-l-fuchsia-700 dark:border-l-fuchsia-500 ${
          selectIcon === 4
            ? "animate-[borderIn_3s_ease-in-out]"
            : "animate-[borderOut_1s_ease-in-out] opacity-0"
        }`}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
      >
        <g fill={fillColor}>
          <path d="M4 3a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z" />
          <path
            fillRule="evenodd"
            d="M3 8h14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm5 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </g>
      </svg>
    </li>
  );
};
