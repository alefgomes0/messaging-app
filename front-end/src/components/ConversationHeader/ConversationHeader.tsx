import { useState, useEffect } from "react";
import { useSocket } from "../../context/useSocket";

type ConversationHeaderProps = {
  profilePicture: string | null;
  contactName: string;
};

export const ConversationHeader = ({
  profilePicture,
  contactName,
}: ConversationHeaderProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("connected", (userId) => {
      console.log(userId)
      setIsOnline(true);
    });

    return () => {
      socket.off("connected", () => {
        setIsOnline(false);
      });
    };
  }, [socket]);

  return (
    <div className="min-h-[70px] grid grid-cols-[65px_1fr] grid-rows-2 bg-[#1e1e1e] px-3 mb-8">
      {profilePicture ? (
        <img
          className="w-[58px] h-[58px] rounded-full col-start-1 col-end-2 row-span-full self-center"
          src={profilePicture}
          alt=""
        />
      ) : (
        <div className="w-[58px] h-[58px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
      )}
      <h3 className="text-neutral-200 self-end font-bold">{contactName}</h3>
      <h5 className="text-sm text-neutral-200 opacity-80">
        {isOnline ? "Online" : "Offline"}
      </h5>
    </div>
  );
};
