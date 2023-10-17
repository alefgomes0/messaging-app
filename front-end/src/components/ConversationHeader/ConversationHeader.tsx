import { useEffect, useState } from "react";
import { useSocket } from "../../context/useSocket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BackIcon } from "../svg/BackIcon";
import { useWindowSize } from "../../hooks/useWindowSize";

type ConversationHeaderProps = {
  profilePicture: string | null;
  contactId: string;
};

export const ConversationHeader = ({
  profilePicture,
  contactId,
}: ConversationHeaderProps) => {
  const { state } = useLocation();
  const { contactName, conversationId } = state;
  const { socket } = useSocket();
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize < 768;
  const navigate = useNavigate();
  const { userId } = useParams();

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

  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    socket?.on("typing", (room) => {
      if (room === conversationId) {
        setIsUserTyping(true);

        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          setIsUserTyping(false);
        }, 2000);
      }
    });

    return () => {
      socket?.off("typing", () => {
        setIsUserTyping(false);
      });
    };
  }, [socket, conversationId]);

  return (
    <div
      className={`min-h-[70px] grid ${
        isMobile ? "grid-cols-[30px_65px_1fr] mb-3" : "grid-cols-[65px_1fr] mb-8"
      } grid-rows-2 gap-x-2 gap-y-1 bg-zinc-50 dark:bg-[#1e1e1e] px-3 `}
    >
      {isMobile && (
        <div
          className="cursor-pointer col-start-1 col-end-2 row-span-full self-center pl-[6.5px]"
          onClick={() => navigate(`/${userId}`)}
        >
          <BackIcon />
        </div>
      )}
      {profilePicture ? (
        <img
          className={`w-[58px] h-[58px] rounded-full ${
            isMobile ? "col-start-2 col-end-3" : "col-start-1 col-end-2"
          } row-span-full self-center`}
          src={profilePicture}
          alt=""
        />
      ) : (
        <div
          className={`w-[58px] h-[58px] rounded-full bg-blue-600 ${
            isMobile ? "col-start-2 col-end-3" : "col-start-1 col-end-2"
          } row-span-full self-center`}
        ></div>
      )}
      <h3 className="text-neutral-800 dark:text-neutral-200 self-end font-bold">
        {contactName}
      </h3>
      {isUserTyping ? (
        <p
          className={`text-sm text-fuchsia-600 opacity-90 row-start-2  row-end-3 ${
            isMobile ? "col-start-3 col-end-4" : "col-start-2 col-end-3"
          }`}
        >
          ...is typing
        </p>
      ) : (
        <p
          className={`text-sm text-neutral-800 dark:text-neutral-200 opacity-80 ${
            isMobile ? "col-start-3 col-end-4" : "col-start-2 col-end-3"
          }`}
        >
          {isUserOnline ? "Online" : "Offline"}
        </p>
      )}
    </div>
  );
};
