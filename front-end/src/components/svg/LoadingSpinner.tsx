import { IconeProps } from "../../types/IconeProps";

export const LoadingSpinner = ({ width, height }: IconeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="animate-spin"
    >
      <path
        fill="currentColor"
        d="M15 8c0 3.9-3.1 7-7 7s-7-3-7-7H0c0 4 3.6 8 8 8s8-3.6 8-8h-1z"
      />
    </svg>
  );
};
