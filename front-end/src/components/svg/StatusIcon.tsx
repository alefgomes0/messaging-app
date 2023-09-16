import { IconeProps } from "../../types/IconeProps";

export const PhoneIcon = ({ width, height }: IconeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke-width="2"
      >
        <path d="M15 3.512a9.025 9.025 0 0 1 5.5 5.523M11 3.055a9.001 9.001 0 0 0-6.605 13.76L3 21l4.185-1.395A9.001 9.001 0 0 0 20.945 13" />
        <path d="M12 17a5 5 0 0 1-5-5m2-4a5 5 0 0 1 7 7" />
        <circle cx="12" cy="12" r="1" />
      </g>
    </svg>
  );
};
