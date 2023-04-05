import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";


export const SocketContext = createContext();
export const ProviderSocketContext = ({children}) => {
    const {usersOn , sendMessage ,sendSuggestFriend ,arrivalSuggestFriend ,arrivalMess ,confirmFriend , arrivalConfrimFriend} = useSocket();
    
    return (
        <SocketContext.Provider value={{usersOn , sendMessage , sendSuggestFriend ,arrivalSuggestFriend ,arrivalMess,confirmFriend , arrivalConfrimFriend}} >

            {children}
        </SocketContext.Provider>
    )
}