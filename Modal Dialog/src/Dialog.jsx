import React, { useEffect, useRef } from 'react'

const Dialog = ({close,children}) => {
    useEffect(()=>{
        document.addEventListener('keyup',handleKeyUp)  //  subscribing to keyboard events
        return ()=>{
            document.removeEventListener("keyup",handleKeyUp)
        }
    },[])
    const contentRef=useRef()
    const backdropRef=useRef()

    function handleKeyUp(e){
        // alert(e.key)
        if(e.key==='Escape')
            handleClose()
    }
    function handleClose(){
        // onClose() will not work here because the opacity is 0 and Dialog is still in DOM and has not been removed from DOM
        contentRef.current.classList.add("hide-dialog")
        backdropRef.current.classList.add("hide-dialog")
        // calling onClose() after animation ends
        // once:true -> runs only once and get removed after that
        contentRef.current.addEventListener('animationend',close,{once:true}) 
    }

  return (
    <div className='dialog'>
        <div ref={backdropRef} onClick={handleClose} className="dialog-backdrop"/>
        <div ref={contentRef} className="dialog-content">
            {
                !!close && <button onClick={handleClose} className='dialog-close'>&times;</button>
            }
            {children}
        </div>
    </div>  
  )
}

export default Dialog