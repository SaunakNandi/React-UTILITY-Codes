import { useState } from 'react'
import { CheckoutStepper } from './components/CheckoutStepper'
import { CHECKOUT_STEPS } from './constants/constant'
import './App.css'
import Checkout from './components/Checkout'

function App() {
  return (
    <>
      <h2>Checkout</h2>
      <CheckoutStepper steps={CHECKOUT_STEPS}></CheckoutStepper>
      {/* <Checkout steps={CHECKOUT_STEPS}/> */}
    </>
  )
}

export default App
