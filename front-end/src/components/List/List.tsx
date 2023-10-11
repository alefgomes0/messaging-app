import { LastMessageWithContact } from "../../types/ConversationListProps";
import { ContactCard } from "../ContactCard/ContactCard";

type ListProps = {
  conversationListInfo: null | LastMessageWithContact[];
  query: string;
};

export const List = ({ conversationListInfo, query }: ListProps) => {
  const filteredContactConversation = conversationListInfo?.filter(
    (conversation) =>
      conversation.participants[0].name
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  const conversationInfo = query
    ? filteredContactConversation
    : conversationListInfo;

  console.log(conversationListInfo);

  return (
    <nav className="overflow-y-auto">
      {conversationListInfo ? (
        <>
          {conversationInfo?.map((conversation) => {
            if (conversation.messages.length === 0) return;
            return (
              <ContactCard
                key={conversation.participants[0]._id}
                contactName={conversation.participants[0].name}
                contactId={conversation.participants[0]._id}
                conversationId={conversation._id}
                profilePicture={conversation.participants[0].profilePicture}
                searchedUser={false}
                time={conversation.messages[0].time}
                message={conversation.messages[0].message}
              />
            );
          })}
        </>
      ) : (
        <h3 className="px-3 pt-3 text-neutral-200 text-2xl">
          No conversations found
        </h3>
      )}
    </nav>
  );
};
