import { createContext , useState, useEffect } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {
    const [darkMode , setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    useEffect(() => {
        localStorage.setItem('darkMode' ,darkMode);
    },[darkMode])
    return (
        <DarkModeContext.Provider value={{toggleDarkMode,darkMode}} >
            {children}
        </DarkModeContext.Provider>
    )
}

