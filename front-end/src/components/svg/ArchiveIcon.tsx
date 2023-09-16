import { IconeProps } from "../../types/IconeProps";

export const MessageIcon = ({ width, height }: IconeProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <g fill="currentColor">
        <path d="M4 3a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z" />
        <path
          fill-rule="evenodd"
          d="M3 8h14v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm5 3a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Z"
          clip-rule="evenodd"
        />
      </g>
    </svg>
  );
};
