import React, { useEffect, useState } from 'react'
import OTPinput from './OTPinput'
import {  BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import  {auth}  from '../firebase.config';

export const PhoneOTP = () => {
    const [phoneNumber,setPhoneNumber]=useState("")
    const [ showOTP,setShowOTP]=useState(false) 
    function FirebaseSignInHandler()
    {
        console.log(auth)
            if(!window.recaptchaVerifier)
                {
                    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                        'size': 'normal',
                        'callback': (response) => {
                            console.log(response)
                          SignIn()
                        },
                        'expired-callback': () => {
                          // Response expired. Ask user to solve reCAPTCHA again.
                          // ...
                        }
                      },auth);
                }
    }
    const SignIn=async()=>{
        try{
            const recaptcha=new RecaptchaVerifier(auth)
        }
    }
    const handlePhoneSubmit=(e)=>{
        e.preventDefault()

        // phone number validation
        const regex=/[^0-9]/g
        setPhoneNumber(prev=> prev.replaceAll('-',''))
        console.log(phoneNumber)
        if(regex.test(phoneNumber))
        {
            alert("Invalid phone number")
            return
        }

        // call the backend api

        SignIn()

        // show OTP 
        setShowOTP(true)
    }
    // const handlePhoneNumber=(e)=>{
    //     setPhoneNumber(e.target.value)
    // }
    function onOTPsubmit(otp){

    }
  return (
    <div>
        <div id="recaptcha-container"></div>
        {!showOTP?( 
        <form onSubmit={handlePhoneSubmit}>
            <div className="input_form">
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={10} />
                </div>
                <PhoneInput country={"in"} value={phoneNumber} 
                onChange={()=>setPhoneNumber('+'+phoneNumber)} />
            </div>
            {/* <input type="text" 
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder='Enter Phone Number'/> */}
        
            <button className='sms-btn'>Send code via SMS</button>
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
