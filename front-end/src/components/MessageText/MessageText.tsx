import axios from "axios";
import { useState } from "react";

type MessageTextProps = {
  contactId: string;
};

export const MessageText = ({ contactId }: MessageTextProps) => {
  const [message, setMessage] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const userId = "6508695537fe843f89aa8444";

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/${contactId}/messages`, {
      userId,
      message,
    });
    setMessage("");
  };

  return (
    <form method="POST" action="" onSubmit={handleOnSubmit} className="flex">
      <textarea
        name="message"
        onChange={handleOnChange}
        value={message}
        placeholder="Message"
        className="text-sm w-full h-16 p-3 bg-[#333] placeholder:text-neutral-200 placeholder:opacity-80 text-neutral-200 border-transparent outline-none "
      />
      {message ? (
        <div className="flex items-center justify-center w-16 h-16 bg-[#333]">
          <button
            type="submit"
            className="w-[56px] h-[56px] flex items-center justify-center text-neutral-100 hover:bg-neutral-700 rounded-md text-xl"
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
