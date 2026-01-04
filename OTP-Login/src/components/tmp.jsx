import React, { useRef, useState } from "react";

export const tmp = (digits = 4) => {
  const [otp, setOTP] = useState(digits);
  const boxRef = useRef([]);
  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const newOTP = [...otp];
    newOTP[index] = val.substring(1);
    const combinedOTP = newOTP.join("");
    if (combinedOTP.length == digits) {
      submitOTP();
      return;
    }
    if (index < digits - 1) boxRef.current[index + 1].focus();
    setOTP(newOTP);
  };
  const handleClick = (index) => {
    boxRef.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (e, index) => {
    if (index > 0 && e.key == "Backspace" && !otp[index])
      boxRef.current[index - 1].focus();
  };

  return <div>tmp</div>;
};
