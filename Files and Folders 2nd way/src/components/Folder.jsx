import { useState } from "react"

export function Folder({handleInsertNode,explorer}){
    // console.log(explorer)
    const [expand,setExpand]=useState(false)
    const [showInput,setShowInput]=useState({
        visible: false,
        isFolder:null
    })
    // stops event bubbling
    const handleNewFolder=(e,isFolder)=>{
        e.stopPropagation()
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })
    }

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
                    <div className="folder" onClick={()=>{setExpand(!expand)}}>
                        <span>📁{explorer.name}</span>
                        <div>
                            <button onClick={(e)=>handleNewFolder(e,true)}>Folder ➕</button>
                            <button onClick={(e)=>handleNewFolder(e,false)}>File ➕</button>
                        </div>
                    </div>
                    <div style={{display: (expand)?"block":"none",paddingLeft:25}} >
                  
                        {
                            showInput.visible && (
                                <div style={{display:'flex'}}>
                                    <span>{showInput.isFolder?"📁" : "📄"}</span>
                                    <input type="text" className="inputContainer__input"
                                    onKeyDown={onAddFolder} autoFocus
                                    onBlur={()=>setShowInput({...showInput,visible:false})}/>
                                </div>
                            )
                        }
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