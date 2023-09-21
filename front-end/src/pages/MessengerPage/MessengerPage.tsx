import { MessagesInfo } from "../../MessagesInfo/MessagesInfo";
import { MessengerHeader } from "../../components/MessengerHeader/MessengerHeader";
import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const MessengerPage = () => {
  return (
    <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr]">
      <MessengerHeader />
      <Navbar />
      <div className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[350px_1fr] bg-neutral-900">
        <MessagesInfo />
        <Outlet />
      </div>
    </main>
  );
};
