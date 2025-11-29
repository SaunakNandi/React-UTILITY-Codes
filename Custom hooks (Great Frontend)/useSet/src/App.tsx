import './App.css'
import { useSet } from './useSet';

function App() {
  const { set, add, remove, toggle, reset, clear } = useSet(new Set(['hello']));
  console.log("set ",set)
  return (
    <div>
      <button onClick={() => add(Date.now().toString())}>Add</button>
      <button onClick={() => remove('hello')}>
        Remove 'hello'
      </button>
      <button onClick={() => toggle('hello')}>Toggle hello</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => clear()}>Clear</button>
      <pre>{JSON.stringify(Array.from(set ?? []), null, 2)}</pre>
    </div>
  );
}

export default App
