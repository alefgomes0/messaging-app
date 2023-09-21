import { ConversationProps } from "../../types/ConversationProps";

type MessageBodyProps = {
  contactName: string;
  contactId: string;
  allMessages: ConversationProps[] | null;
};

export const MessageBody = ({
  contactName,
  contactId,
  allMessages,
}: MessageBodyProps) => {
  return (
    <>
      <div className="min-h-[70px] grid grid-cols-[65px_1fr] grid-rows-2 bg-[#1e1e1e] px-3">
        <div className="w-[45px] h-[45px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
        <h3 className="text-neutral-200 self-end font-bold">{contactName}</h3>
      </div>
      <div className="bg-neutral-800">
        {allMessages?.map((message) => {
          return (
            <span
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
