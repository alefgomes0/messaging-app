import { useEffect, useState } from "react";
import { useSocket } from "../../context/useSocket";

type ConversationHeaderProps = {
  profilePicture: string | null;
  contactName: string;
  contactId: string;
};

export const ConversationHeader = ({
  profilePicture,
  contactName,
  contactId,
}: ConversationHeaderProps) => {
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("online-users", (listOfUsers) => {
      setOnlineUsers(listOfUsers);
      console.log(onlineUsers)
    });

    socket.on("users-online", (listOfUsers) => {
      setOnlineUsers(listOfUsers);
    });

    return () => {
      socket.off("online-users");
      socket.off("users-online");
    };
  }, [socket]);


  return (
    <div className="min-h-[70px] grid grid-cols-[65px_1fr] grid-rows-2 gap-x-2 gap-y-1 bg-[#1e1e1e] px-3 mb-8">
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
      <p className="text-sm text-neutral-200 opacity-80">
        {onlineUsers.includes(contactId) ? "Online" : "Offline"}
      </p>
    </div>
  );
};
