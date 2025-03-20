export default function Events({events}){
    return (
        <>
            {
                events.map((event)=>{
                    const startHour=event.start.split(":")[0]
                    const startMin=event.start.split(":")[1]
                    const endHour=event.end.split(":")[0]
                    const endMin=event.end.split(":")[1]
                    const top=startHour*5 + (startMin/60)*5
                    const height=(endHour-startHour)*5 + ((endMin-startMin)/60)*5

                    return (
                        <div className="event" style={{top:`${top}rem`, height:`${height}rem`}}>
                            {event.title}                        
                        </div>
                    )
                })
            }
        </>
    )
}