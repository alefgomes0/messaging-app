import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ErrorMessage } from "../../types/ErrorMessage";
import { useSocket } from "../../context/useSocket";
import { Emoji } from "../Emoji/Emoji";

type MessageTextProps = {
  contactId: string;
  handleMessageSent: () => void;
  setError: React.Dispatch<React.SetStateAction<null | ErrorMessage>>;
  conversationId: string;
};

export const MessageText = ({
  contactId,
  handleMessageSent,
  setError,
  conversationId,
}: MessageTextProps) => {
  const [message, setMessage] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const { auth } = useAuthContext();
  const userId = auth.id;
  const axiosPrivate = useAxiosPrivate();
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<null | HTMLButtonElement>(null);
  const { socket } = useSocket();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    socket?.emit("typing", conversationId);
    setMessage(e.target.value);
  };

  useEffect(() => {
    const handleTextareaFocus = () => {
      document.activeElement === textareaRef.current
        ? setIsTextareaFocused(true)
        : setIsTextareaFocused(false);
    };

    window.addEventListener("focusin", handleTextareaFocus);
    window.addEventListener("focusout", handleTextareaFocus);

    setMessage("");

    return () => {
      window.removeEventListener("focusin", handleTextareaFocus);
      window.removeEventListener("focusout", handleTextareaFocus);
    };
  }, [contactId]);

  useEffect(() => {
    const sendMessageWithEnter = (event: KeyboardEvent) => {
      if (isTextareaFocused && message && event.key === "Enter")
        submitButtonRef.current?.click();
    };

    document.addEventListener("keydown", sendMessageWithEnter);

    return () => {
      document.removeEventListener("keydown", sendMessageWithEnter);
    };
  }, [isTextareaFocused, message]);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosPrivate.post(
        `/messages/${contactId}`,
        {
          userId,
          message,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMessage("");
      handleMessageSent();
    } catch (err) {
      setError(err as ErrorMessage);
    }
  };

  return (
    <form method="POST" action="" onSubmit={handleOnSubmit} className="flex">
      <Emoji handleOnChange={setMessage}/>
      <textarea
        name="message"
        onChange={handleOnChange}
        value={message}
        placeholder="Message"
        className="text-sm w-full h-10 pl-3 pr-3 pt-3 bg-neutral-200 dark:bg-[#333] placeholder:text-black dark:placeholder:text-neutral-200 placeholder:opacity-90 dark:placeholder:opacity-80 text-neutral-800 dark:text-neutral-200 border-transparent outline-none "
        ref={textareaRef}
      />
      {message ? (
        <div className="flex items-center justify-center w-16 h-10 bg-neutral-200 dark:bg-[#333]">
          <button
            type="submit"
            className="w-[56px] h-10 flex items-center justify-center text-neutral-700 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-700 rounded-md text-xl"
            ref={submitButtonRef}
          >
            &#10148;
          </button>
        </div>
      ) : (
        <div className="w-16 h-10 bg-neutral-200 dark:bg-[#333]"></div>
      )}
    </form>
  );
};
