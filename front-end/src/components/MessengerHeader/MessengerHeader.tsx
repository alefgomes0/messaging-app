import { LogoutButton } from "../LogoutButton/LogoutButton"

export const MessengerHeader = () => {
  return (
    <header className="flex items-center justify-between h-12 bg-neutral-800 px-4 row-start-1 row-end-2 col-span-full">
      <h1 className="text-lg text-neutral-50">Odin Zap</h1>
      <LogoutButton />
    </header>
  )
}