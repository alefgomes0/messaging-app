import axios from "../../api/axios";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { MessagesInfo } from "../../components/MessagesInfo/MessagesInfo";
import { useSocket } from "../../context/useSocket";
import { SearchUser } from "../../components/SearchUser/SearchUser";

export const MessengerPage = () => {
  const { auth, setAuth } = useAuthContext();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [suspiciousActivity, setSuspiciousActivity] = useState(false);
  const [searchUser, setSearchUser] = useState(false);

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
          await axios.get("/logout", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
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

  return (
    <>
      {suspiciousActivity ? (
        <></>
      ) : (
        <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr]">
          <AppHeader />
          <Navbar id={auth.id} setSearchUser={setSearchUser} />
          <div className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[350px_1fr] bg-neutral-900">
            {searchUser ? <SearchUser /> : <MessagesInfo id={auth.id} />}
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};
