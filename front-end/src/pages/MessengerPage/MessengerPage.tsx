import { MessengerHeader } from "../../components/MessengerHeader/MessengerHeader"
import { Navbar } from "../../components/Navbar/Navbar"

export const MessengerPage = () => {
  return (
    <main className="grid grid-rows-[48px_1fr] grid-cols-[48px_250px_1fr]">
      <MessengerHeader />
      <Navbar />
      <div className="h-[calc(100dvh-48px)] w-[calc(100vw-48px)] bg-neutral-700 z-10"></div>
    </main>
  )
}