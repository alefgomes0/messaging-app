import { useState, useRef } from "react";
import { EmojiIcon } from "../svg/EmojiIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useUserContext } from "../../context/useUserContext";

export const Emoji = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useUserContext();
  const emojiRef = useRef<HTMLDivElement>(null!)

  return (
    <div
      onClick={() => {
        setShowEmojiPicker(!showEmojiPicker);
        console.log(showEmojiPicker);
      }}
      className="w-[56px] h-10 flex items-center justify-center text-neutral-700 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded-md text-xl"
    >
      <EmojiIcon />
      {showEmojiPicker && (
        <div className="absolute left-[0%] md:left-[25%] top-[23%] md:top-[37%]" ref={emojiRef}>
          <Picker
            data={data}
            onEmojiSelect={console.log}
            theme={theme === "light" ? "light" : "dark"}
          />
        </div>
      )}
    </div>
  );
};
