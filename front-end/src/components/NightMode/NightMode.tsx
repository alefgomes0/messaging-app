import { useUserContext } from "../../context/useUserContext";
import { Moon } from "../svg/Moon";
import { Sun } from "../svg/Sun";

export const NightMode = () => {
  const { theme, setTheme } = useUserContext();
  console.log(theme);

  return (
    <div
      className="w-min flex items-center gap-1 cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun />
      <span className="text-neutral-500">|</span>
      <Moon />
    </div>
  );
};

/* className={`bg-neutral-400 dark:bg-neutral-100 ${
  theme === "light" ? "opacity-100" : "opacity-50"
} transition-opacity transition-colors duration-300`} */
