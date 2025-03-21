import React, { useContext, useState } from 'react'
import { FileExplorerContext } from '../context/FileExplorerContext'
import Input from './Input'

const FileExplorer = ({id=1}) => {
    const [showChildren,setShowChildren]=useState(false)
    const [showAddInput,setShowAddInput]=useState(false)
    const [showEditInput,setShowEditInput]=useState(false)
    const {nodes,deleteNode,addNode,editNode}=useContext(FileExplorerContext)
    
  return (
    <div className="container">
        <h5>
            {nodes[id].type==='folder'?(showChildren?"📁":'📂'):"📄"}
            {
                showEditInput? <Input name={nodes[id].name} cancel={()=>setShowEditInput(false)} id={id} submit={editNode}/>:
                <>
                    <span onClick={()=>setShowChildren(prev=>!prev)}>{nodes[id].name}</span>
                    {
                        nodes[id].type=="folder" && <span onClick={()=>setShowAddInput(true)}>➕</span>
                    }
                    <span onClick={()=>deleteNode(id)} style={{cursor:'pointer'}}>❌</span>
                    <span onClick={()=>setShowEditInput(true)}>🖋️</span>
                </>
            }
        </h5>
        <>
            {
                showAddInput && <Input submit={addNode} id={id} cancel={()=>setShowAddInput(false)}/>
            }
        </>
        {/* {console.log(nodes[id].children)} */}
        {
            showChildren && nodes[id]?.children?.map((childId,i)=>(
                <FileExplorer key={i} id={childId} />
            ))
        }
    </div>
  )
}

export default FileExplorer