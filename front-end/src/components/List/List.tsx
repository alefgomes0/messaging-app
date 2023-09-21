import { ConversationListProps } from "../../types/ConversationListProps";
import { NavLink } from "react-router-dom";

type ListProps = {
  conversationListInfo: null | ConversationListProps[];
};

export const List = ({ conversationListInfo }: ListProps) => {
  console.log(conversationListInfo);

  return (
    <nav>
      {conversationListInfo ? (
        <>
          {conversationListInfo.map((conversation) => {
            return (
              <NavLink
                to={`${conversation.participants[0]._id}`}
                state={{ contactName: conversation.participants[0].name }}
                className="min-h-[90px] w-full grid grid-cols-[60px_1fr] grid-rows-2 items-center gap-x-4 gap-y-1 text-neutral-200 rounded-md hover:bg-neutral-700 transition-colors cursor-auto  px-3"
                key={conversation.participants[0]._id}
              >
                <div className="w-[58px] h-[58px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
                <div className="w-full self-end flex justify-between col-start-2 col-end-3 row-start-1 row-end-2">
                  <h4 className="font-bold text-neutral-100">
                    {conversation.participants[0].name}
                  </h4>
                  <h6 className="text-xs opacity-60">
                    {conversation.messages[0].time}
                  </h6>
                </div>
                <p className="truncate text-sm self-start col-start-2 col-end-3 row-start-2 row-end-3 opacity-70">
                  {conversation.messages[0].message}
                </p>
              </NavLink>
            );
          })}
        </>
      ) : (
        <h3>No conversations found</h3>
      )}
    </nav>
  );
};
