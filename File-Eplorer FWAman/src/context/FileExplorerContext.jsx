import { createContext, useState } from "react";
import { data } from "../data/data.js";
export const FileExplorerContext=createContext()

export default function FileExplorerWrapper({children})
{
    const  [nodes,setNodes]=useState(data)
    const addNode=(parentId,value)=>{
        const newId=Date.now()
        const newData={id:newId,name:value,parentId}
        const isFolder=value.split(".")
        if(isFolder.length>1)
        {
            newData.type="file"
        }else{
            newData.type="folder"
            newData.children=[]
        }
        const updatedNodes={...nodes,[newId]:newData}
        updatedNodes[parentId].children.push(newId)
        setNodes(updatedNodes)
    }
    const deleteNode=(id)=>{
        const updatedNodes={...nodes}
        const parentId=updatedNodes[id].parentId
        // deleting the file/folder from parent node
        updatedNodes[parentId].children=updatedNodes[parentId].children.filter((childId)=>childId!==id)
        const queue=[id]
        while(queue.length>0)
        {
            const currentId=queue.shift() // removes from first
            if(nodes[currentId].children)
                queue.push(...nodes[currentId].children)
            delete updatedNodes[currentId]
        }
        setNodes(updatedNodes)
    }

    const editNode=(id,value)=>{
        const updatedNodes={...nodes}
        updatedNodes[id].name=value
        setNodes(updatedNodes)
    }
    return (
        <FileExplorerContext.Provider value={{nodes,deleteNode,addNode,editNode}}>
            {children}
        </FileExplorerContext.Provider>
    )
}