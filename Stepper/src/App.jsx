import { useState } from 'react'
import { CheckoutStepper } from './components/CheckoutStepper'
import { CHECKOUT_STEPS } from './constants/constant'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Checkout</h2>
      <CheckoutStepper steps={CHECKOUT_STEPS}></CheckoutStepper>
    </>
  )
}

export default App
