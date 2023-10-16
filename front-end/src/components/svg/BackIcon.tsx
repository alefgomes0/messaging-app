import { useUserContext } from "../../context/useUserContext";

export const BackIcon = () => {
  const { theme } = useUserContext();
  const fillColor = theme === "light" ? "#0e020d" : "#e4e4e4";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <g transform="rotate(-90 10 10)">
        <path
          fill={fillColor}
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414L11 5.414V17a1 1 0 1 1-2 0V5.414L4.707 9.707a1 1 0 0 1-1.414 0Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};
