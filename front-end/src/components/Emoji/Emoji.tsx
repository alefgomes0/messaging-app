import { useState } from "react";
import { EmojiIcon } from "../svg/EmojiIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useUserContext } from "../../context/useUserContext";

type EmojiComponentProps = {
  handleOnChange: React.Dispatch<React.SetStateAction<string>>;
};

type EmojiProps = {
  native: string;
};

export const Emoji = ({ handleOnChange }: EmojiComponentProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useUserContext();

  return (
    <div
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setShowEmojiPicker(!showEmojiPicker);
      }}
      className="w-[56px] h-10 flex items-center justify-center text-neutral-700 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded-md text-xl"
    >
      <EmojiIcon />
      {showEmojiPicker && (
        <div className="absolute left-[0%] md:left-[25%] top-[23%] md:top-[37%]">
          <Picker
            data={data}
            onEmojiSelect={(emoji: EmojiProps) =>
              handleOnChange((prev) => prev + emoji.native)
            }
            theme={theme === "light" ? "light" : "dark"}
            onClickOutside={() => {
              if (showEmojiPicker) setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
