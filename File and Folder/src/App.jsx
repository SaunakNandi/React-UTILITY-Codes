import { useContext, useState } from 'react'
import { explorer } from './constants/data'
import {Folder} from './components/Folder'
import { useTraverseTree } from './hooks/use-traverse-tree'
import { ExplorerContext } from './context/Explorer'

function App() {
  const [explorerData, setExplorerData] = useState(explorer)
  const {insertNode}=useTraverseTree()
  const handleInsertNode=(folderId,value,isFolder)=>{
    const finalTree=insertNode(explorerData,folderId,value,isFolder)
    setExplorerData(finalTree)
  }
  const {tabId,setTabId,setShowInput}=useContext(ExplorerContext)
  const handleNewFolder=(e,isFolder)=>{
    e.stopPropagation()
    // setExpand(true)
    setShowInput({
        visible: true,
        isFolder
    })
    if(tabId==-1 || tabId==1)
      setTabId(1)
    console.log(tabId)
  }

  return (
    <>
      <div className="App">      
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder ➕</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File ➕</button>
          </div> 
          <Folder explorer={explorerData} handleInsertNode={handleInsertNode}/>  
      </div>
    </>
  )
}

export default App
