
import './App.css'

function App() {
  return (
    <div>
      <button popoverTarget='my-popover'>Click me to show popover</button>
      <div id="my-popover" popover='manual'>
        My popover content
        <h1>Hey there, how are you?</h1>
        <button popoverTarget='my-popover' popoverTargetAction='hide'>Close</button>
      </div>
    </div>
  )
}

export default App
