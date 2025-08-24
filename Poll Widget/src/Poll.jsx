import React, { useState } from 'react'
import { data } from './data'

const Poll = () => {
    const [pollData,setPollData]=useState(data)

    function handleInputChange(id){
        const totalCount=pollData.reduce((acc,x)=>acc+=x.count,0)
        const updatedData=pollData.map((item)=>{
            if(id==item.id)
            {
                const percent=Math.floor(((item.count+1)*100)/totalCount)
                return {...item,percentage:percent,count:item.count+1}
            }
            return {...item}
        })
        console.log("udpated data ",updatedData)
        setPollData(updatedData)
    }
    return (
    <div style={{marginLeft:'auto',marginRight:'auto'}}>
        <h3>Which sport is most popular?</h3>
        {
            pollData && pollData.map((item)=>{
                return(
                    <div style={{width:'350px',padding:'10px'}} key={item.id}>
                        <label htmlFor={item.id} style={{display:'flex', alignItems:'center',justifyContent:'space-between', textAlign:'left'}}>
                            <div>
                                <input type="radio" id={item.id} name='radio' onChange={()=>handleInputChange(item.id)}/>
                                {item.label}
                            </div>
                            <div className="display-bar" style={{width:'230px',height:'10px',borderRadius:'30px',backgroundColor:'gray',position:'relative'}}>
                                <div className="" style={{position:'absolute',width:`${item.percentage}%`,height:'100%',backgroundColor:'green',borderTopLeftRadius:'30px',borderBottomLeftRadius:'30px'}}></div>
                            </div>
                        </label>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Poll