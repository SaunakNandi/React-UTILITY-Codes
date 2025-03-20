import { useState } from 'react'
import './App.css'
import MultiStepForm from './MultiStepForm/MultiStepForm'

function App() {
  const [formSubmitted,setFormSubmitted]=useState(false)
  const [cancel,setCancel]=useState(false)
  function onSubmit(){
    setFormSubmitted(true)
  }
  function onCancel(){
    setCancel(true)
  }
  return (
    <>
      {formSubmitted && <h1>Form Submitted</h1>}
      {!formSubmitted && (
        <MultiStepForm onCancel={onCancel} onSubmit={onSubmit}/>
        )}
      {cancel && <h1>User want's to cancel</h1>}
    </>
  )
}

export default App
