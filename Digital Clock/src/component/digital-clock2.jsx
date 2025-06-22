import { useEffect } from "react"

const Digital=()=>{

    const [time,setTime]=useState(new Date())

    useEffect(()=>{
        const tick=()=>{
            setTime(new Date())
            const now=new Date()
            const delay=1000-(now%1000)  // sync update to start of next seconds
            setTimeout(tick,delay)
        }
        const timeOutId=setTimeout(tick,1000)
        return ()=>clearTimeout(timeOutId)
    })
    return (
        <div>{}</div>
    )
}