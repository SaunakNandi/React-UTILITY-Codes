import React, { useEffect, useRef, useState } from 'react'

const Carousel = ({children}) => {
    const [currentInd,setCurrentInd]=useState(0)
    const carouselBoxRef=useRef()
    const intervalRef=useRef(0)
    useEffect(()=>{
        // showing the first image
        const {slides}=getSlidesInfo()
        slides[0].setAttribute('data-active','true')
        startSlider()
        return () => clearInterval(intervalRef.current);
    },[])

    // function HandleCarouselMovement(curIdx,newIdx,next)
    // {
    //     if(next)
    //     {
    //         // hide the previous one
    //         slides[curIdx].classList.remove('show','showL')
    //         slides[curIdx].classList.add('hide')

    //         // show next one
    //         slides[newIdx].classList.remove('hide','hideL')
    //         slides[newIdx].classList.add('show') 
    //     }
    // }
    function startSlider(){
        // subscription
        // The setInterval function keeps running indefinitely even if the component unmounts, which can cause unexpected behavior.
        // Every time setCurrentInd updates the state, React re-renders the component, but the interval does not restart, leading to weird jumps in values.
        clearInterval(intervalRef.current);
        const {slides,count}=getSlidesInfo()
        intervalRef.current=setInterval(()=>{
        setCurrentInd((prev)=>{
            const newIndx=prev==count-1? 0:prev+1;
            
            // converting slides to array
            // [...slides].forEach((element,i) => {
            //     // set 'data-active' to current active element
            //     element.setAttribute("data-active",i==newIndx)
            // });

            // hide previous one
            slides[prev].classList.remove('show','showL')
            slides[prev].classList.add('hide')

            // show next one
            slides[newIndx].classList.remove('hide','hideL')
            slides[newIndx].classList.add('show')     
            // HandleCarouselMovement(prev,newIndx,true)       
            // console.log(newIndx)
            return newIndx
        })
        },3000)
    }
    function getSlidesInfo(){
        const carouselBox=carouselBoxRef.current
        const slides=carouselBox.children  //HTML nodes
        const count=slides.length
        return {slides,count}
    }
    function handlePrevious()
    {
        clearInterval(intervalRef.current)
        const {slides,count}=getSlidesInfo()
        const newIndx=currentInd==0? count-1:currentInd-1;
        // [...slides].forEach((element,i) => {
        //     // set 'data-active' to current active element
        //     element.setAttribute("data-active",i==newIndx)
        // });
        slides[currentInd].classList.remove('show','showL')
        slides[currentInd].classList.add('hideL')
        slides[newIndx].classList.add('showL')
        slides[newIndx].classList.remove('hide','hideL')
        startSlider()
        setCurrentInd(newIndx)
    }
    function handleNext(){
        clearInterval(intervalRef.current)
        const {slides,count}=getSlidesInfo()
        const newIndx=currentInd==count-1? 0:currentInd+1;
        // [...slides].forEach((element,i) => {
        //     // set 'data-active' to current active element
        //     element.setAttribute("data-active",i==newIndx)
        // });
        slides[currentInd].classList.remove('show','showL')
        slides[currentInd].classList.add('hide')
        slides[newIndx].classList.add('show')
        slides[newIndx].classList.remove('hide','hideL')
        startSlider()
        setCurrentInd(newIndx)
    }
    function handleStepperClick(newIndx){
        return ()=>{
            clearInterval(intervalRef.current);
            const {slides}=getSlidesInfo();
            // [...slides].forEach((element,i) => {
            //     // set 'data-active' to current active element
            //     element.setAttribute("data-active",i==newIndx)
            // });
            // console.log(newIndx,currentInd)
            if(newIndx<currentInd)
            {
                slides[currentInd].classList.remove('show','showL')
                slides[currentInd].classList.add('hideL')
                slides[newIndx].classList.add('showL')
                slides[newIndx].classList.remove('hide','hideL')
            }
            else
            {
                // hide previous one
                slides[currentInd].classList.remove('show','showL')
                slides[currentInd].classList.add('hide')
            
                // show next one
                slides[newIndx].classList.remove('hide','hideL')
                slides[newIndx].classList.add('show')
            }
            startSlider()
            setCurrentInd(newIndx)
        }
    }
    function handleMouseEnter(){
        clearInterval(intervalRef.current)
    }
    function handleMouseLeave(){
        startSlider()
    }
  return (
    <div className='carousel'>
        <div ref={carouselBoxRef} className="box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
        </div>
        <button className='prev' onClick={handlePrevious}>Prev</button>
        <button className='next' onClick={handleNext}>Next</button>
        <div className="stepper">
            {
                Array.from(children).map((_,i)=>{
                    return (
                        <button onClick={handleStepperClick(i)} key={i}>{i}</button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Carousel