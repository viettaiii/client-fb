import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";


export const SocketContext = createContext();

export const ProviderSocketContext = ({children}) => {
    const {usersOn , sendMessage } = useSocket();
    
    return (
        <SocketContext.Provider value={{usersOn , sendMessage}} >
            {children}
        </SocketContext.Provider>
    )
}