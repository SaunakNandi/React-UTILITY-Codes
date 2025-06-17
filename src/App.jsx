import './App.css'
import Traffic from './component/Traffic'

function App() {
  const lightData=[
    {
      color:'red',
      order:1,
      display_order:1,
      time:3000
    },
    {
      color:'yellow',
      order:2,
      display_order:2,
      time:2000
    },
    {
      color:'green',
      order:3,
      display_order:3,
      time:4000
    },
  ]

  return (
    <>
      <Traffic lightData={lightData}/>
    </>
  )
}

export default App
