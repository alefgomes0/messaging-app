import { useState } from "react";
import { EmojiIcon } from "../svg/EmojiIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useUserContext } from "../../context/useUserContext";

export const Emoji = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useUserContext();

  return (
    <div
      onClick={() => setShowEmojiPicker(true)}
      className="w-[56px] h-10 flex items-center justify-center text-neutral-700 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded-md text-xl"
    >
      <EmojiIcon>
        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={console.log}
            onClickOutside={() => setShowEmojiPicker(false)}
            theme={theme === "light" ? "light" : "dark"}
          />
        )}
      </EmojiIcon>
    </div>
  );
};
