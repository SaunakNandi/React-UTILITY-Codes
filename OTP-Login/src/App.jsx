import PhoneOTP from "./components/PhoneOTP";
import "./App.css";
import OTPinput from "./components/OTPInput";

function App() {
  return (
    <>
      <div className="App">
        <h1>Login with Phone</h1>
        {/* <PhoneOTP/> */}
        <OTPinput />
      </div>
    </>
  );
}

export default App;
