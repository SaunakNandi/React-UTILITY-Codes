import { Children, createContext, useContext, useEffect, useState } from "react";

export const ThemeContext=createContext()
export const useTheme=()=>{
    return useContext(ThemeContext)
}

export const ThemeProvider=({children})=>{
    const [isDarkMode,setIsDarkMode]=useState(false)
    const toggleTheme=()=> setIsDarkMode(prev=> !prev)
    const theme=isDarkMode?"dark":"light"

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme)
    },[isDarkMode])
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}