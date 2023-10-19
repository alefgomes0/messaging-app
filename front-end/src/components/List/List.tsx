import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { LastMessageWithContact } from "../../types/ConversationListProps";
import { ContactCard } from "../ContactCard/ContactCard";

type ListProps = {
  conversationListInfo: null | LastMessageWithContact[];
  query: string;
  handleNotification: () => void;
};

export const List = ({
  conversationListInfo,
  query,
  handleNotification,
}: ListProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, contactId } = useParams();
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

  const markMessageAsRead = async (conversationId: string) => {
    try {
      await axiosPrivate.put("/mark-message", {
        conversationId,
      });
      return "ok";
    } catch (err) {
      console.log(err);
      return "fail";
    }
  };

  return (
    <nav className="overflow-y-auto">
      {conversationListInfo ? (
        <>
          {conversationInfo?.map((conversation) => {
            if (conversation.messages.length <= 0) return;
            return (
              <div
                className="relative"
                key={conversation.participants[0]._id}
                onClick={() => {
                  markMessageAsRead(conversation._id)
                    .then(() => {
                      if (!conversation.newMessage?.read) handleNotification();
                    })
                    .catch(() => console.log("error"));
                }}
              >
                <ContactCard
                  contactName={conversation.participants[0].name}
                  contactId={conversation.participants[0]._id}
                  conversationId={conversation._id}
                  profilePicture={conversation.participants[0].profilePicture}
                  searchedUser={false}
                  time={conversation.messages[0].time}
                  message={conversation.messages[0].message}
                />
                {!conversation.newMessage?.read &&
                  conversation.newMessage?.receiver === userId &&
                  conversation.newMessage?.sender !== contactId && (
                    <div className="absolute bottom-0 right-0 bg-fuchsia-700 px-3 py-.5 rounded-sm">
                      <p className="text-xs text-fuchsia-50 ">NEW</p>
                    </div>
                  )}
              </div>
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
