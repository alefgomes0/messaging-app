import { NavLink } from "react-router-dom";

type ContactCardProps = {
  contactId: string;
  contactName: string;
  conversationId?: string;
  profilePicture: string | undefined;
  searchedUser: boolean;
  time?: string;
  email?: string;
  message?: string;
};

export const ContactCard = ({
  contactId,
  contactName,
  conversationId,
  profilePicture,
  searchedUser,
  time,
  email,
  message,
}: ContactCardProps) => {
  return (
    <NavLink
      to={`conversation/${contactId}`}
      state={{ contactName: contactName, conversationId: conversationId }}
      className={({ isActive }) =>
        `min-h-[90px] w-full grid grid-cols-[60px_1fr] grid-rows-2 items-center gap-x-4 gap-y-1 text-neutral-200 rounded-md ${
          isActive ? "bg-[#333]" : ""
        } hover:bg-neutral-700 transition-colors cursor-auto  px-3 `
      }
    >
      {profilePicture ? (
        <img
          className="w-[58px] h-[58px] rounded-full col-start-1 col-end-2 row-span-full self-center"
          src={profilePicture}
          alt=""
        />
      ) : (
        <div className="w-[58px] h-[58px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
      )}
      <div className="w-full self-end flex justify-between col-start-2 col-end-3 row-start-1 row-end-2">
        <h4 className="font-bold text-neutral-100">{contactName}</h4>
        {!searchedUser && <h6 className="text-xs opacity-60">{time}</h6>}
      </div>
      <p className="truncate text-sm self-start col-start-2 col-end-3 row-start-2 row-end-3 opacity-70">
        {searchedUser ? email : message}
      </p>
    </NavLink>
  );
};
