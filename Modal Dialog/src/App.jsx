import { useState } from 'react'
import Dialog from './Dialog'

function App() {
  const [showDialog, setShowDialog] = useState(false)
  const handleShowDialog=()=>{
    // console.log(showDialog)
    setShowDialog(!showDialog)
  }
  const handleCloseDialog=()=>{
    setShowDialog(false)
  }
  return (
    <div className='App'>
      <button onClick={handleShowDialog}>Toggle Dialog</button>
      {
        showDialog && (
          <Dialog close={handleCloseDialog}>
            <h1>Title</h1>
            <span>Random</span>
          </Dialog>
        )
      }
    </div>
  )
}

export default App
