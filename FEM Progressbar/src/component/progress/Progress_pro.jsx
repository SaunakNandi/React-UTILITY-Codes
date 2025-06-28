import React,{useEffect,useRef} from 'react'

const Progress_pro = ({value,max,onComplete=()=>{},onStart=()=>{}}) => {
    const progressStartRef=useRef(false)
        useEffect(()=>{
            if(value>=max)
            {
                onComplete()
                return
            }
            if(value)
            {
                if(progressStartRef.current)
                {
                    
                }
                else{
                    progressStartRef.current=true
                    onStart()  
                }
            }
        },[value])
  return (
    <div className='progress'>
        <progress value={value} max={100}/>
    </div>
  )
}

export default Progress_pro