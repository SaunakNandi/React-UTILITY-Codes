import { useState } from 'react'
import './App.css'
import { PhoneOTP } from './components/PhoneOTP'

function App() {

  return (
    <>
      <div className="App">
        <h1>Login with Phone</h1>
        <PhoneOTP/>
      </div>
    </>
  )
}

export default App
