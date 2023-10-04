import { useEffect, useRef } from "react";
import { ConversationProps } from "../../types/ConversationProps";
import { ConversationHeader } from "../ConversationHeader/ConversationHeader";

type MessageBodyProps = {
  contactName: string;
  contactId: string;
  allMessages: ConversationProps[] | null;
  profilePicture: null | string;
  newMessageSent: null | ConversationProps;
};

export const MessageBody = ({
  contactName,
  contactId,
  allMessages,
  profilePicture,
  newMessageSent,
}: MessageBodyProps) => {
  const messageRef = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [allMessages, newMessageSent]);

  return (
    <>
      <ConversationHeader
        profilePicture={profilePicture}
        contactName={contactName}
      />
      <div className="overflow-y-auto bg-neutral-800">
        {allMessages?.map((message) => {
          return (
            <span
              ref={messageRef}
              key={message._id}
              className={`grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] w-max max-w-[50%] h-max text-sm text-neutral-200 rounded-md mb-2 ${
                message.participants.sender === contactId
                  ? "bg-neutral-700 justify-self-start ml-8"
                  : "bg-fuchsia-900 ml-auto mr-8"
              }`}
            >
              <p className="text-neutral-200 self-center pl-4 pb-1">
                {message.message}
              </p>
              <span className="self-end ml-4 mt-4 mr-2 mb-.5">
                <p className="text-[9px] opacity-70">{message.time}</p>
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
};
