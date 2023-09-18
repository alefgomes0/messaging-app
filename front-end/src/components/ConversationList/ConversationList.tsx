import { useEffect, useState } from "react";
import axios from "axios";

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchContactsData = async () => {
      const response = await axios.get(
        "http://localhost:3000/contacts/6508695537fe843f89aa8443"
      );
      console.log(response)
    };

    fetchContactsData();
  });

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-4">
      <h2 className="text-neutral-100 text-xl font-semibold">Conversations</h2>
      <input
        type="search"
        placeholder="Search or start a new conversation"
        onChange={handleOnChange}
        value={searchValue}
      />
      <div></div>
    </section>
  );
};
