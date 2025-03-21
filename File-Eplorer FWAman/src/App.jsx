
import './App.css'
import FileExplorerWrapper from './context/FileExplorerContext'
import {data} from './data/data.js'
import FileExplorer from './components/FileExplorer.jsx'

function App() {

  return (
    <>
      <FileExplorerWrapper>
        <FileExplorer data={data} id={1}/>
      </FileExplorerWrapper>
    </>
  )
}

export default App
