import { useContext } from "react";
import { SocketContext } from "./SocketProvider"

export function useSocketContext() {
  return useContext(SocketContext)
}