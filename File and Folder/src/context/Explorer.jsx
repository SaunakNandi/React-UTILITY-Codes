import { createContext, useState } from "react"

export const ExplorerContext = createContext()
export const Explorer=({children})=>{
    const [tabId,setTabId]=useState(-1)
    const [showInput,setShowInput]=useState({
        visible: false,
        isFolder: null
    })
    console.log(tabId)
    return(
        <ExplorerContext.Provider value={{tabId,setTabId,showInput,setShowInput}}>
            {children}
        </ExplorerContext.Provider>
    )
}