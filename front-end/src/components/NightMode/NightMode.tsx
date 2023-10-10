import { useUserContext } from "../../context/useUserContext";
import { Moon } from "../svg/Moon";
import { Sun } from "../svg/Sun";

export const NightMode = () => {
  const { theme, setTheme } = useUserContext();

  return (
    <div
      className="w-min flex items-center gap-1 cursor-pointer mr-4"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun />
      <span className="text-neutral-500">|</span>
      <Moon />
    </div>
  );
};


