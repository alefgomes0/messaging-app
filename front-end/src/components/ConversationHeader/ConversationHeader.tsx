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
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    const checkIfUserOnline = (onlineUsers: string[]) => {
      onlineUsers.includes(contactId)
        ? setIsUserOnline(true)
        : setIsUserOnline(false);
    };
    if (!socket) return;

    socket.emit("get-online-users", "wake");

    socket.on("set-online-users", (listOfOnlineUsers) => {
      checkIfUserOnline(listOfOnlineUsers);
      console.log(listOfOnlineUsers);
    });

    return () => {
      socket.off("get-online-users");
      socket.off("set-online-users");
    };
  }, [contactId, socket]);

  useEffect(() => {
    socket?.on("typing", (ewr) => {
      setIsUserTyping(true);
      console.log("AAAAAAAAAAAAFDSF");
    });

    return () => {
      socket?.off("typing");
    };
  }, [socket]);

  return (
    <div className="min-h-[70px] grid grid-cols-[65px_1fr] grid-rows-2 gap-x-2 gap-y-1 bg-zinc-50 dark:bg-[#1e1e1e] px-3 mb-8">
      {profilePicture ? (
        <img
          className="w-[58px] h-[58px] rounded-full col-start-1 col-end-2 row-span-full self-center"
          src={profilePicture}
          alt=""
        />
      ) : (
        <div className="w-[58px] h-[58px] rounded-full bg-blue-600 col-start-1 col-end-2 row-span-full self-center"></div>
      )}
      <h3 className="text-neutral-800 dark:text-neutral-200 self-end font-bold">
        {contactName}
      </h3>
      {isUserTyping ? (
        <p className="text-sm text-fuchsia-600 opacity-90">...is typing</p>
      ) : (
        <p className="text-sm text-neutral-800 dark:text-neutral-200 opacity-80">
          {isUserOnline ? "Online" : "Offline"}
        </p>
      )}
    </div>
  );
};
