import { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "../SearchBar/SearchBar";

export const ConversationList = () => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchContactsData = async () => {
      const response = await axios.get(
        "http://localhost:3000/conversation/6508695537fe843f89aa8444"
      );
      console.log(response);
    };

    fetchContactsData();
  }, []);

  return (
    <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-zinc-800 rounded-l-lg gap-4 pt-3 px-3">
      <h2 className="text-neutral-100 text-xl font-semibold">Conversations</h2>
      <SearchBar handleOnChange={setSearchValue} searchValue={searchValue} />
      <div></div>
    </section>
  );
};
