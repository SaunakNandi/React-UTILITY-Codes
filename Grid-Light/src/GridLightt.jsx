import { useState } from "react"

const config=[
    [1,1,0],
    [0,1,1],
    [1,0,0]
]

export function GridLight(){
    const [stack,setStack]=useState(new Map())  // to store the lights in order of insertion
    function hanldeClick(rowIndex,colIndex){
        return ()=>{
            const newStack=structuredClone(stack)
            const key=`${rowIndex}-${colIndex}`

            // ignoring if key already included or config[rowIndex][colIndex] is 0 
            if(newStack.get(key) || !config[rowIndex][colIndex]) return
            else{
                newStack.set(key,true)
            }
            setStack(newStack)

            // sum of all 1=number of lights
            const lightSelected=config.flat().reduce((a,b)=>{
                return a+b;
            },0)

            if(lightSelected==newStack.size)
                startRollback()
        }
    }

    function startRollback()
    {
        const intervalId=setInterval(()=>{
            setStack((prevStack)=>{
                const lastKey=Array.from(prevStack.keys()).pop()
                const newStack=structuredClone(prevStack)
                newStack.delete(lastKey)

                if(!newStack.size)
                    clearInterval(intervalId)
                return newStack
            })
        },1000)
    }
    return (
        <div className="grid-light">
        {
            config.map((row,rowIndex)=>{
                return (
                    <div className="grid-row" key={rowIndex}>
                    {
                        row.map((value,colIndex)=>{
                            let lightClass=""
                            if(value==0)
                                lightClass="off"
                            const key=`${rowIndex}-${colIndex}`
                            if(stack.has(key))
                                lightClass+="on"
                            return (
                                <div className={`light ${lightClass}`}key={colIndex}
                                onClick={hanldeClick(rowIndex,colIndex)}></div>
                            )
                        })
                    }
                    </div>
                )
            })
        }
        </div>
    )
}