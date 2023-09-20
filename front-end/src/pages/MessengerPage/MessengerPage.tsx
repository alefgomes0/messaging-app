import { ConversationList } from "../../components/ConversationList/ConversationList";
import { MessengerHeader } from "../../components/MessengerHeader/MessengerHeader";
import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom"

export const MessengerPage = () => {
  return (
    <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr] bg-neutral-900">
      <MessengerHeader />
      <Navbar />
      <div className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] grid grid-rows-1 grid-cols-[350px_1fr] bg-neutral-900">
        <ConversationList />
        <Outlet />
      </div>
    </main>
  );
};
