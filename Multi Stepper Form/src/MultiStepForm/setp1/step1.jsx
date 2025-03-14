import React from 'react'

const Step1 = ({inputs,onChange=()=>{},stepKey}) => {
    const {firstname,email}=inputs
    function handleChange(inputkey){
        return (e)=>
        onChange({value:e.target.value,stepKey,inputkey})
    }
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <div className="control-row">
        <label htmlFor="firstName">FirstName</label>
        <input
          onChange={handleChange('firstname')}
          type="text"
          id="firstName"
          value={firstname}
        />
      </div>

      <div className="control-row">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange('email')}
          type="text"
          id="email"
          value={email}
        />
      </div>
    </fieldset>
  )
}

export default Step1