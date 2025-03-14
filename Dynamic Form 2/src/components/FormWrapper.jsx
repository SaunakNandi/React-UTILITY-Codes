import React from 'react'
import TextField from './TextField'
import Checkbox from './Checkbox'

const FormWrapper = ({ disableSubmit, inputs, onInputChange, onCancel, onSubmit, onBlur }) => {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className='form-wrapper' onSubmit={handleSubmit}>
            {
                Object.keys(inputs).map((key) => {
                    const data = inputs[key]
                    return (
                        <div>
                            <h4>{data.name}</h4>
                            {
                                data.inputs.map((input, index) => {
                                    if (input.type === 'checkbox') {
                                        // {...input} sending everything at once
                                        return <Checkbox index={index} onChange={onInputChange} key={input.id}
                                           categoryKey={key} {...input} />
                                    }
                                    return <TextField index={index} onBlur={onBlur} onChange={onInputChange} key={input.id} 
                                    categoryKey={key} {...input} />
                                })
                            }
                        </div>
                    )
                })
            }
            <div className="">
                <button type='reset' onClick={onCancel}>Cancel</button>
                <button className='success' type='submit' disabled={disableSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default FormWrapper