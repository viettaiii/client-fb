import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";


export const SocketContext = createContext();

export const ProviderSocketContext = ({children}) => {
    const [usersOn , handleSendMessage ] = useSocket();
    
    return (
        <SocketContext.Provider value={{usersOn , handleSendMessage}} >
            {children}
        </SocketContext.Provider>
    )
}