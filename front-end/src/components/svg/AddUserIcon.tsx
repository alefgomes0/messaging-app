import { IconeProps } from "../../types/IconeProps";

export const AddUserIcon = ({
  width,
  height,
  selectIcon,
  setSelectIcon,
  setSearchUser,
}: IconeProps) => {
  return (
    <li
      className={`relative rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-neutral-700 ${
        selectIcon === 1 ? "bg-neutral-700 opacity-70" : "bg-neutral-800"
      }  transition-colors duration-100 ease-in-out`}
      onClick={() => {
        if (setSearchUser && setSelectIcon) {
          setSearchUser(true);
          setSelectIcon(1);
        }
      }}
    >
      <div
        className={`w-4 h-[16px] rounded absolute left-0 top-50 border-l-4 border-l-fuchsia-500 ${
          selectIcon === 1
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
          d="M11.5 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7ZM6 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0ZM19 13v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2ZM8 16a4 4 0 0 0-4 4h8.05v2H2v-2a6 6 0 0 1 6-6h4v2H8Z"
        />
      </svg>
    </li>
  );
};
