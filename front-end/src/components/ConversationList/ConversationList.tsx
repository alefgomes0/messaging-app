import { useState } from "react";

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <section>
      <h2>Conversations</h2>
      <input
        type="search"
        placeholder="Search or start a new conversation"
        onChange={handleOnChange}
        value={searchValue}
      />
    </section>
  );
};
