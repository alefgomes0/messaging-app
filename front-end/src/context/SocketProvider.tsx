import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./useAuthContext";

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketContextValues = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};

export const SocketContext = createContext({} as SocketContextValues)

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { auth } = useAuthContext();
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return () => {
      socket?.close()
    }
  }, [])



  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  )
}
