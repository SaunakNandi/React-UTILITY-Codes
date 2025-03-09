
import './App.css'
import { VirtualizedList } from './VirtualizedList'

function App() {
  const list=Array.from({length:100000},(_,index)=>index+1)

  return (
    <>
      <VirtualizedList list={list} height={400}  width={300} itemHeight={35}/>
    </>
  )
}

export default App
