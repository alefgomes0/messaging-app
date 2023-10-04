import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { MessagesInfo } from "../../components/MessagesInfo/MessagesInfo";

export const MessengerPage = () => {
  const { auth } = useAuthContext();

  return (
    <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr]">
      <AppHeader />
      <Navbar id={auth.id} />
      <div className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[350px_1fr] bg-neutral-900">
        <MessagesInfo id={auth.id} />
        <Outlet />
      </div>
    </main>
  );
};
