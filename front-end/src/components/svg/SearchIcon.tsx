import { IconeProps } from "../../types/IconeProps";

export const SearchIcon = ({ width, height }: IconeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 21"
    >
      <g transform="rotate(90 10.5 10.5)">
        <g
          fill="none"
          fillRule="evenodd"
          stroke="#e5e5e5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8.5" cy="8.5" r="5" />
          <path d="M17.571 17.5L12 12" />
        </g>
      </g>
    </svg>
  );
};
