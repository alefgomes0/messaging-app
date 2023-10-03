import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./useAuthContext";

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketContextValues = {
  socket: null | Socket;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};

export const SocketContext = createContext({} as SocketContextValues);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const { auth } = useAuthContext();
  const id = auth.id;

  useEffect(() => {
    const newSocket = io("http://localhost:5173", {
      query: { id },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
