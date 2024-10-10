import { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
import OTPinput from './OTPInput';
export default function PhoneOTP() {
    const [phoneNumber,setPhoneNumber]=useState("")
    const [ showOTP,setShowOTP]=useState(false)
    const [user,setUser]=useState(null)
    
    const SignIn=async()=>{
        try {
            const format='+'+phoneNumber
            const recaptcha=new RecaptchaVerifier(auth,'recaptcha',{})
            const confirmation=await signInWithPhoneNumber(auth,format,recaptcha)
            setShowOTP(true)
            setUser(confirmation)
            console.log(confirmation)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePhoneSubmit=(e)=>{
        e.preventDefault()

        // phone number validation
        const regex=/[^0-9]/g
        // setPhoneNumber(prev=> prev.replaceAll('-',''))
        if(regex.test(phoneNumber))
        {
            alert("Invalid phone number")
            return
        }

        // call the backend api

        SignIn()

        // show OTP 
        
    }
    // const handlePhoneNumber=(e)=>{
    //     setPhoneNumber(e.target.value)
    // }
    async function onOTPsubmit(otp){
        try {
            await user.confirm(otp)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        {!showOTP?( 
        <form onSubmit={handlePhoneSubmit}>
            <div className="input_form">
                <PhoneInput country={"in"} value={phoneNumber} 
                onChange={setPhoneNumber} />
            </div>
            {/* <input type="text" 
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder='Enter Phone Number'/> */}
        
            <button className='sms-btn'>Send code via SMS</button>
            <div id="recaptcha"></div>
        </form> 
        ) :(
            <div>
                <p>Enter the OTP sent to your mobile number {phoneNumber}</p>
                <OTPinput length={4} onOTPsubmit={onOTPsubmit}/>
            </div>
        )
        }
        
    </div>
  )
}
