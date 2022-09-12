import './index.css';
import {useEffect, useState} from "react";


function App() {
  const [pomoSecond, setPomoSecond] = useState(0);
  const [pomoMinute, setPomoMinute] = useState(26);
  const [breakSecond, setBreakSecond] = useState(0);
  const [breakMinute, setBreakMinute] = useState(6);
  const [isOn, setIsOn] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [breakActive, setBreakActive] = useState(false);
  const [amount, setAmount] = useState(2);

  const showPomoMinute = pomoMinute === 0 ? 0 : pomoMinute - 1;
  const displayPomoMinute = showPomoMinute < 10 ? "0" + showPomoMinute : showPomoMinute;
  const displayPomoSecond = pomoSecond < 10 ? "0" + pomoSecond : pomoSecond;


  const showBreakMinute = breakMinute === 0 ? 0 : breakMinute - 1;
  const displayBreakMinute = showBreakMinute < 10 ? "0" + showBreakMinute : showBreakMinute;
  const displayBreakSecond = breakSecond < 10 ? "0" + breakSecond : breakSecond;
  
// Pomo Timer
useEffect(() => {
  if (isActive && amount !== 0 && isOn) {
    const timer = setInterval(() => setPomoSecond(pomoSecond => pomoSecond - 1), 1000);
      if (pomoSecond === 0) {
        setTimeout(() => {
          setPomoSecond(59);
          setPomoMinute(pomoMinute => pomoMinute - 1);
        }, 1000)     
      }

      if (pomoMinute === 0) {
      clearInterval(timer)
      playToneBreak();
      setAmount(amount => amount -1)
      setIsActive(!isActive)
      setBreakActive(!breakActive)
      setBreakMinute(6)
      }
      
      return () => clearInterval(timer);
    }}, [pomoSecond, pomoMinute, isActive, breakActive, amount, isOn])

// Break Timer
useEffect(() => {
  if (breakActive && amount !== 0 && isOn) {
    const timer = setInterval(() => setBreakSecond(breakSecond => breakSecond - 1), 1000);

    if (breakSecond === 0) {
      setTimeout(() => {
        setBreakSecond(59)
        setBreakMinute(breakMinute => breakMinute - 1)
      }, 1000)
      
    }


    if (breakMinute === 0) {
      clearInterval(timer)
      playToneStart()
      setBreakActive(!breakActive)
      setIsActive(!isActive)
      setPomoMinute(26)
      
    }

    return () => clearInterval(timer);
  }
}, [breakSecond, breakMinute, pomoMinute, breakActive, isActive, amount, isOn])


// sound break
 const playToneBreak = () => {
  const tone = document.getElementById("audioClock");
  tone.volume = 0.05;
  tone.play();
 }
// sound focus
 const playToneStart = () => {
  const tone = document.getElementById("audioRacing");
  tone.volume = 0.05;
  tone.play();
 }
// start
const handleActive = () => {
  breakActive ? setIsActive(false) : setIsActive(!isActive);
}
// add time
const addSec = () => {
  if (!isActive) {
    setPomoMinute(pomoMinute => pomoMinute + 1)
  }  
}
// sub time
const subSec = () => {
  if (!isActive) {
    pomoMinute === 0
    ? setPomoMinute(0)
    : setPomoMinute(pomoMinute => pomoMinute - 1)
  } 
}
// add session
const addAmount = () => {
  if (!isActive) {
    setAmount(amount => amount + 1)
  } 
}
// sub session
const subAmount = () => {
  if (!isActive) {
    amount === 0
    ? setAmount(0)
    : setAmount(amount => amount - 1)
  } 
}
// reset
const reset = () => {
  setIsActive(false);
  setBreakActive(false);
  setPomoSecond(0);
  setPomoMinute(26);
}
// pause
const pause = () => {
  setIsOn(!isOn)
}
      
return (  
  <div className="timer">
  <h1 className="head">Pomodoro-Timer</h1>
  <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662663906/mixkit-racing-countdown-timer-1051_mcd5op.wav" id="audioRacing">
  </audio>
  <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662664556/mixkit-clock-bells-hour-signal-1069_m0vcfy.wav" id="audioClock">
  </audio>

  <div className="displayShow">
    {
      breakActive ? 
      <div className="breakTimer" id="breakTimer">
        <h1 className="break">Break!</h1>
        <div className="clock">{displayBreakMinute}:{displayBreakSecond}</div>
      </div> 
    : <div className="pomoTimer" id="pomoTimer">
        <h1 className="pomo">Focus!</h1>
        <div className="clock">{displayPomoMinute}:{displayPomoSecond}</div>
      </div>
    }
  </div>

  <div className="timerDisplay">
    <div>Session: {amount}</div>
  </div>

  <div className="buttonHolder">
    <div className="control">
      <div className="button" onClick={addSec}>➕ time</div>
      <div className="button" onClick={subSec}>➖ time</div>
      <div className="button" onClick={addAmount}>➕ session</div>
      <div className="button" onClick={subAmount}>➖ session</div>
    </div>
    <div className="startStop">
      <div className="button" onClick={handleActive}>start</div>
      <div className="button" onClick={pause}>Pause</div>
      <div className="button" onClick={reset}>Reset</div>
    </div>
  </div>
   {/* <p>second {breakSecond}</p>
  <p>minute {breakMinute}</p>
    <div>Time: {displayPomoMinute}:{displayPomoSecond}</div> */}
  </div>
)
}

export default App;
