import { LogoutButton } from "../LogoutButton/LogoutButton"
import { NightMode } from "../NightMode/NightMode"

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between h-12 bg-zinc-200 dark:bg-neutral-800 px-4 row-start-1 row-end-2 col-span-full">
      <h1 className="text-lg mr-auto text-neutral-600 dark:text-neutral-50">Odin Zap</h1>
      <NightMode />
      <LogoutButton />
    </header>
  )
}