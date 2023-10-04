import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ErrorMessage } from "../../types/ErrorMessage";

type MessageTextProps = {
  contactId: string;
  handleMessageSent: () => void;
  setError: React.Dispatch<React.SetStateAction<null | ErrorMessage>>;
};

export const MessageText = ({
  contactId,
  handleMessageSent,
  setError,
}: MessageTextProps) => {
  const [message, setMessage] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const { auth } = useAuthContext();
  const userId = auth.id;
  const axiosPrivate = useAxiosPrivate();
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<null | HTMLButtonElement>(null);

  useEffect(() => {
    const handleTextareaFocus = () => {
      document.activeElement === textareaRef.current
        ? setIsTextareaFocused(true)
        : setIsTextareaFocused(false);
    };

    window.addEventListener("focusin", handleTextareaFocus);
    window.addEventListener("focusout", handleTextareaFocus);

    return () => {
      window.removeEventListener("focusin", handleTextareaFocus);
      window.removeEventListener("focusout", handleTextareaFocus);
    };
  }, []);

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
      <textarea
        name="message"
        onChange={handleOnChange}
        value={message}
        placeholder="Message"
        className="text-sm w-full h-16 p-3 bg-[#333] placeholder:text-neutral-200 placeholder:opacity-80 text-neutral-200 border-transparent outline-none "
        ref={textareaRef}
      />
      {message ? (
        <div className="flex items-center justify-center w-16 h-16 bg-[#333]">
          <button
            type="submit"
            className="w-[56px] h-[56px] flex items-center justify-center text-neutral-100 hover:bg-neutral-700 rounded-md text-xl"
            ref={submitButtonRef}
          >
            &#10148;
          </button>
        </div>
      ) : (
        <div className="w-16 h-16 bg-[#333]"></div>
      )}
    </form>
  );
};
