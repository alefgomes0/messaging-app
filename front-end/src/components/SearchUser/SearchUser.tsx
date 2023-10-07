import { SearchBar } from "../SearchBar/SearchBar"

export const SearchUser = () => {
  return (
    <section className="grid grid-cols-1 grid-rows-[auto_auto_1fr] bg-[#1e1e1e] border-r-2 border-neutral-900 rounded-l-lg gap-4 pt-3">
      <SearchBar inputPlaceholder="Search for a user by the name or email"/>
    </section>
  )
}