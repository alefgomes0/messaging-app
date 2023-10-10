import { IconeProps } from "../../types/IconeProps";
import { useUserContext } from "../../context/useUserContext";

export const StarIcon = ({
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
        selectIcon === 3
          ? "bg-zinc-400 dark:bg-neutral-700 opacity-70"
          : "bg-zinc-200 dark:bg-neutral-800"
      }  transition-colors duration-100 ease-in-out`}
      onClick={() => {
        if (!setSelectIcon) return;
        setSelectIcon(3);
      }}
    >
      <div
        className={`w-4 h-[16px] rounded absolute left-0 top-50 border-l-4 border-l-fuchsia-700 dark:border-l-fuchsia-500 ${
          selectIcon === 3
            ? "animate-[borderIn_3s_ease-in-out]"
            : "animate-[borderOut_1s_ease-in-out] opacity-0"
        }`}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 16 16"
      >
        <path
          fill={fillColor}
          d="m15.9 6.2l-5.5-.8L8 .4l-2.4 5l-5.5.8L4 10l-.9 5.4L8 12.9l4.9 2.6L12 10l3.9-3.8zM8 11.8l-3.6 1.9l.7-4l-2.9-2.8l4-.6L8 2.7l1.8 3.6l4 .6l-2.9 2.8l.7 4L8 11.8z"
        />
      </svg>
    </li>
  );
};
