import { useState } from "react";

export const MessageText = () => {
  const [message, setMessage] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form method="POST" action="" className="flex gap-1">
      <label htmlFor="message"></label>
      <textarea
        name="message"
        onChange={handleOnChange}
        value={message}
        placeholder="Message"
        className="border-2 border-gray-700 min-w-[400px] h-16 rounded px-2"
      />
      {message ? (
        <button
          type="submit"
          className="rounded-lg w-16 h-16 bg-indigo-600 text-indigo-50"
        >
          SEND
        </button>
      ) : (
        <div className="w-16 h-16"></div>
      )}
    </form>
  );
};
