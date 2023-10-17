import { useEffect, useRef } from "react";
import { ConversationProps } from "../../types/ConversationProps";
import { ConversationHeader } from "../ConversationHeader/ConversationHeader";
import { useWindowSize } from "../../hooks/useWindowSize";

type MessageBodyProps = {
  contactId: string;
  allMessages: ConversationProps[] | null;
  profilePicture: null | string;
  newMessageSent: null | ConversationProps;
};

export const MessageBody = ({
  contactId,
  allMessages,
  profilePicture,
  newMessageSent,
}: MessageBodyProps) => {
  const messageRef = useRef<null | HTMLSpanElement>(null);
  const windowSize = useWindowSize();
  const isMobile = windowSize < 768;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [allMessages, newMessageSent]);

  return (
    <>
      <ConversationHeader
        profilePicture={profilePicture}
        contactId={contactId}
        key={contactId}
      />
      <div className="overflow-y-auto bg-zinc-100 dark:bg-neutral-800">
        {allMessages ? (
          <>
            {allMessages.map((message) => {
              return (
                <span
                  ref={messageRef}
                  key={message._id}
                  className={`grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] w-max max-w-[50%] h-max text-sm text-neutral-700 dark:text-neutral-200 rounded-md mb-2 ${
                    message.participants.sender === contactId
                      ? "bg-neutral-500 dark:bg-neutral-700 opacity-90 dark:opacity-100 justify-self-start ml-3"
                      : "bg-fuchsia-900 ml-auto mr-3"
                  }`}
                >
                  <p className="text-neutral-200 self-center pl-4 pb-1 whitespace-pre-line">
                    {message.message}
                  </p>

                  <span className="self-end ml-4 mt-4 mr-2 mb-.5">
                    <p className="text-white dark:text-neutral-400 text-[9px] opacity-70">
                      {message.time}
                    </p>
                  </span>
                </span>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
