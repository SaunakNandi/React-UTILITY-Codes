import React from 'react'

export const DayTimeSlots = () => {
    const slots=Array.from({length:24},(_,i)=>i)
  return (
    <>
        {
            slots.map((slot)=>(
                <div className='slot' key={slot}>{slot}:00</div>
            ))
        }
    </>
  )
}
