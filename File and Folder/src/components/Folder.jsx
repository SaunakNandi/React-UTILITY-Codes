import { useContext, useState } from "react"
import { ExplorerContext } from "../context/Explorer"

export function Folder({handleInsertNode,explorer}){
    const {tabId,setTabId,showInput,setShowInput}=useContext(ExplorerContext)
    const [colorActive,setColorActive] = useState(false)
    const [expand,setExpand]=useState(false)

    const onAddFolder=(e)=>{
        // 13 is the keyCode of 'Enter'
        if(e.keyCode===13 && e.target.value)
        {
            handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
            setShowInput({
                ...showInput,
                visible: false
            })
        }
    }
    console.log(tabId,explorer.id,expand)
    if(explorer.isFolder)
    {
        return (
            <div style={{marginTop:5}}>
            <div>
                <div className="folder" onClick={(e)=>{e.stopPropagation(); setExpand(!expand); setTabId(explorer.id)}}
                    style={{backgroundColor: explorer.id===tabId?'gray':'lightgray'}}>
                    <span>📁{explorer.name}</span>
                </div>
                <div style={{display: (expand || (tabId==explorer.id && showInput.visible))?"block":"none",paddingLeft:25}} >
                    {
                        tabId==explorer.id && showInput.visible && (
                            <div style={{display:'flex'}}>
                                <span>{showInput.isFolder?"📁" : "📄"}</span>
                                <input type="text" className="inputContainer__input"
                                onKeyDown={onAddFolder} autoFocus
                                onBlur={()=>setShowInput({...showInput,visible:false})}/>
                            </div>
                        )
                    }
                    {/*  recurssion */}
                    {
                        explorer.items.map((exp)=>(
                            <Folder handleInsertNode={handleInsertNode} explorer={exp} key={exp.id}/>
                        ))
                    }
                </div>
            </div>
        </div>)
    }
    else
    {
        return(
            <span className="file">{explorer.name}</span>
        )
    }
}