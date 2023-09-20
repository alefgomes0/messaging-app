import { useState } from "react";

export const MessageText = () => {
  const [message, setMessage] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form method="POST" action="" className="flex">
      <textarea
        name="message"
        onChange={handleOnChange}
        value={message}
        placeholder="Message"
        className="text-sm w-full h-16 rounded p-3 bg-neutral-700 border-t-2 border-neutral-900 placeholder:text-neutral-200 placeholder:opacity-80 text-neutral-200 border-none outline-none shadow-[0_2px_2px_0_rgba(0,0,0,0.3)_inset]"
      />
      {message ? (
        <div className="flex items-center justify-center w-16 h-16 bg-neutral-700">
          <button
            type="submit"
            className="w-[56px] h-[56px] flex items-center justify-center text-neutral-100 hover:bg-neutral-600 rounded-md text-xl"
          >
            &#10148;
          </button>
        </div>
      ) : (
        <div className="w-16 h-16 bg-neutral-700"></div>
      )}
    </form>
  );
};
