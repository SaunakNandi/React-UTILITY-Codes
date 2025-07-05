import TextField from './TextField'
import Checkbox from './Checkbox'

export const FormWrapper_Array = ({inputs,onInputChange,onInputBlur,onCancel, onSubmit,disableSubmit}) => {
    function handleSubmit(e)
    {
        e.preventDefault()
        onSubmit()
    }
  return (
    <form className='form-wrapper' onSubmit={handleSubmit}>
    {
        Object.keys(inputs).map((key)=>{
            const data=inputs[key]
            return (
                <div className="" key={key}>
                    <h3>{data?.name}</h3>
                    {
                        data?.inputs.map((input,index)=>{
                            if(input.type=="checkbox")
                            {
                                return (
                                    <Checkbox 
                                    categoryKey={key}
                                    index={index}
                                    onChange={onInputChange}
                                    key={input.id}
                                    {...input}/>
                                )
                            }
                            return (
                                <TextField
                                index={index}
                                categoryKey={key}
                                onChange={onInputChange}
                                onBlur={onInputBlur}
                                key={input.id}
                                {...input}/>
                            )
                        })
                    }
                </div>
            )
        })
    }
        <div>
            <button onClick={onCancel}>Cancel</button>
            <button disabled={disableSubmit} type="submit" className='success'>Submit</button>
        </div>
    </form>
  )
}
