import React, { useRef, useState } from 'react'

const TimeFactors={
    Hour:'hh',
    Minute:'mm',
    Seconds:'ss',
    MiliSeconds:'ms'
}

const Config={
    [TimeFactors.Hour]:{
        value:"",
        factor:60*60*1000,
        placeholder:'HH'
    },
    [TimeFactors.Seconds]:{
        value:"",
        factor:1000,
        placeholder:'SS'
    },
    [TimeFactors.Minute]:{
        value:"",
        factor:60*1000,
        placeholder:'MM'
    }
}

const OrderOfTime=[TimeFactors.Hour,TimeFactors.Minute,TimeFactors.Seconds]
export const Timer = () => {
    const [config,setConfig]=useState(structuredClone(Config))
    const [timeOver,setTimeOver]=useState(false)
    const [time,setTime]=useState(0)
    const intervalRef=useRef(null)
    const timeSpentRef=useRef(0)
    function handleChange({key}){
        return (event)=>{
            const newConfig=structuredClone(config)
            newConfig[key].value=event.target.value
            setConfig(newConfig)
        }
    }
    
    function handleStart(){
        let totalTimeInMiliSeconds=0;
        OrderOfTime.forEach(key=>{
            // console.log(config[key])
            const data=config[key]
            const {factor,value}=data
            if(value && !isNaN(value))
            {
                totalTimeInMiliSeconds+=Number(value)*factor
            }
        })
        // Set the time needed to reach
        timeSpentRef.current=Date.now() + totalTimeInMiliSeconds;

        // Motive is to run till timeSpentRef.current == Date.now()
        intervalRef.current=setInterval(()=>{
            const newValue=timeSpentRef.current-Date.now()
            // console.log("newvalue ",newValue)
            if(newValue<=0)
            {
                setTimeOver(true)
                clearInterval(intervalRef.current)
                return
            }
            else{
                setTime(()=>{
                    return newValue
                })
            }
        },10)
    } 

    function handlePause()
    {
        clearInterval(intervalRef.current)
        intervalRef.current=null
    }

    function handleReset(){
        clearInterval(intervalRef)
        intervalRef.current=null
        setTime(0)
        timeSpentRef.current=0
        setConfig(structuredClone(Config))
    }

    function startAgain(){
        setTimeOver(false)
        handleReset()
    }

    function formatedTime(){
        const ms=Math.floor((time%1000)/10)
        const mm=Math.floor((time/(60*1000))%60)
        const ss=Math.floor((time/1000)%60)
        const hh=Math.floor(time/(60*60*1000))
        return `${hh}:${mm}:${ss}:${ms}`
    }

    // console.log(timeOver)
    if(timeOver)
    {
        return (
            <div>
                Times Up!!
                <button onClick={startAgain}>Start again</button>
            </div>
        )
    }
  return (
    <div className="timer">
        <div className="text-fields" style={{display:"flex",justifyContent:'space-between',alignItems:'center',gap:'20px',marginBottom:'20px'}}>
        {
            OrderOfTime.map((orderKey,index)=>{
                const data=config[orderKey]
                return (
                    <div key={orderKey}>
                        <input type='text' value={data.value} onChange={handleChange({key:orderKey,index})}
                        list={`${orderKey}-datalist`}
                        placeholder={data.placeholder}/>
                        <datalist id={`${orderKey}-datalist`}>
                            <option value="5"/>
                            <option value="15"/>
                            <option value="25"/>
                            <option value="35"/>
                            <option value="45"/>
                        </datalist>
                    </div> 
                )
            })
        }
        </div>
        {formatedTime()}
        <div className="buttons" style={{display:"flex",justifyContent:'space-around',alignItems:'center'}}>
            <button onClick={handleStart}>Play</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}
