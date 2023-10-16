import { AppHeader } from "../../components/AppHeader/AppHeader";
import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { MessagesInfo } from "../../components/MessagesInfo/MessagesInfo";
import { useSocket } from "../../context/useSocket";
import { SearchUser } from "../../components/SearchUser/SearchUser";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ConversationList } from "../../components/ConversationList/ConversationList";

export const MessengerPage = () => {
  const { auth, setAuth } = useAuthContext();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [suspiciousActivity, setSuspiciousActivity] = useState(false);
  const [searchUser, setSearchUser] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const windowSize = useWindowSize();
  const isMobile = windowSize < 768;
  const [isConversationSelected, setIsConversationSelected] = useState(false);

  useEffect(() => {
    if (!socket) return;
    socket.emit("setup", userId);
    socket.on("users", (user) => {
      console.log(user);
    });

    const logoutSuspiciousUser = async () => {
      if (auth.id !== userId) {
        try {
          setAuth({
            id: "",
            accessToken: "",
            email: "",
            name: "",
          });
          await axiosPrivate.get("/logout");
          return navigate("/");
        } catch (err) {
          setSuspiciousActivity(true);
        }
      }
    };

    logoutSuspiciousUser();

    return () => {
      socket.off("setup");
      socket.emit("user-disconnect", userId);
    };
  }, [socket, userId]);

  useEffect(() => {
    const showUserOffline = () => {
      socket?.emit("user-disconnect", userId);
    };

    window.addEventListener("beforeunload", showUserOffline);

    return () => window.removeEventListener("beforeunload", showUserOffline);
  }, [socket, userId]);

  return (
    <>
      {suspiciousActivity ? (
        <></>
      ) : (
        <>
          {isMobile ? (
            <main className="relative grid grid-rows-[48px] grid-cols-[48px_1fr]">
              <AppHeader />
              <Navbar id={auth.id} setSearchUser={setSearchUser} />
              <section className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[48px_1fr] bg-zinc-200 dark:bg-neutral-900">
                {searchUser ? <SearchUser /> : <MessagesInfo id={auth.id} />}
                <Outlet />

              </section>
            </main>
          ) : (
            <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr]">
              <AppHeader />
              <Navbar id={auth.id} setSearchUser={setSearchUser} />
              <section className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[350px_1fr] bg-zinc-200 dark:bg-neutral-900">
                {searchUser ? <SearchUser /> : <MessagesInfo id={auth.id} />}
                <Outlet />
              </section>
            </main>
          )}
        </>
      )}
    </>
  );
};
