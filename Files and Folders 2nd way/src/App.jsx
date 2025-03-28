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
  const {setShowInput}=useContext(ExplorerContext)

  return (
    <>
      <div className="App">      
          <Folder explorer={explorerData} handleInsertNode={handleInsertNode}/>
      </div>
    </>
  )
}

export default App
