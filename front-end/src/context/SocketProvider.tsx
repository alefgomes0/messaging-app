import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketContextValues = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};

export const SocketContext = createContext({} as SocketContextValues)

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    })
    setSocket(newSocket)

    return () => {
      socket?.close()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  )
}
