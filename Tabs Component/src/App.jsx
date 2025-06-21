import Component1 from './components/Component1'
import Component2 from './components/Component2'
import Component3 from './components/Component3'
import './App.css'
import { TabList } from './components/TabList'

function App() {
  const tabs=[
    {
      _id:1,
      label:'Component1',
      Component:Component1
    },
    {
      _id:1,
      label:'Component2',
      Component:Component2
    },
    {
      _id:1,
      label:'Component3',
      Component:Component3
    },
  ]

  return (
    <>
      <TabList tabs={tabs}/>
    </>
  )
}

export default App
