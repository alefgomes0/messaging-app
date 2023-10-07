import { IconeProps } from "../../types/IconeProps";

export const MessageIcon = ({
  width,
  height,
  selectIcon,
  setSelectIcon,
  setSearchUser,
}: IconeProps) => {
  return (
    <li
      className={`relative rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-neutral-700 ${
        selectIcon === 0 ? "bg-neutral-700 opacity-70" : "bg-neutral-800"
      }  transition-colors duration-100 ease-in-out`}
      onClick={() => {
        if (setSearchUser && setSelectIcon) {
          setSearchUser(false);
          setSelectIcon(0);
        }
      }}
    >
      <div
        className={`w-4 h-[16px] rounded absolute left-0 top-50 border-l-4 border-l-fuchsia-500 ${
          selectIcon === 0
            ? "animate-[borderIn_3s_ease-in-out]"
            : "animate-[borderOut_1s_ease-in-out] opacity-0"
        }`}
      ></div>
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
