import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../SearchBar/SearchBar";

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchContactsData = async () => {
      const response = await axios.get(
        "http://localhost:3000/contacts/6508695537fe843f89aa8444"
      );
      console.log(response);
    };

    fetchContactsData();
  });

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-zinc-800 rounded-l-lg gap-4 pt-3 pl-3">
      <h2 className="text-neutral-100 text-xl font-semibold">Conversations</h2>
      <SearchBar handleOnChange={handleOnChange} searchValue={searchValue} />
      <div></div>
    </section>
  );
};
