import React from 'react'
import { DayTimeSlots } from './DayTimeSlots'
import events from "../data/events.json"
import Events from './Events'

export const DayView = () => {
  return (
    <div className='calendar'>
        <div className="line"></div>
        <DayTimeSlots/>
        <Events events={events}/>
    </div>
  )
}
