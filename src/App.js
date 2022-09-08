import './index.css';
import {useEffect, useState} from "react";


function App() {
  const [pomoSecond, setPomoSecond] = useState(5);
  const [pomoMinute, setPomoMinute] = useState(2);
  const [breakSecond, setBreakSecond] = useState(5);
  const [breakMinute, setBreakMinute] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [breakActive, setBreakActive] = useState(false);
  const [amount, setAmount] = useState(2);

  const showMinute = pomoMinute === 0 ? 0 : pomoMinute - 1;
  
// Pomo Timer
useEffect(() => {
  if (isActive && amount !== 0) {
    const timer = setInterval(() => setPomoSecond(pomoSecond => pomoSecond - 1), 1000);
      if (pomoSecond === 0) {
        setTimeout(() => {
          setPomoSecond(5);
          setPomoMinute(pomoMinute => pomoMinute - 1);
        }, 1000)     
      }

      if (pomoMinute === 0) {
      clearInterval(timer)
      playToneBreak();
      setAmount(amount => amount -1)
      setIsActive(!isActive)
      setBreakActive(!breakActive)
      }
      
      return () => clearInterval(timer);
    }}, [pomoSecond, pomoMinute, isActive, breakActive, amount])

// Break Timer
useEffect(() => {
  if (breakActive && amount !== 0) {
    const timer = setInterval(() => setBreakSecond(breakSecond => breakSecond - 1), 1000);

    if (breakSecond === 0) {
      setTimeout(() => {
        setBreakSecond(5)
        setBreakMinute(breakMinute => breakMinute - 1)
      }, 1000)
      
    }

    if (breakMinute === 0) {
      clearInterval(timer)
      playToneStart()
      setBreakActive(!breakActive)
      setIsActive(!isActive)
      setPomoMinute(1)
      
    }

    return () => clearInterval(timer);
  }
}, [breakSecond, breakMinute, pomoMinute, breakActive, isActive, amount])


  
 const playToneBreak = () => {
  const tone = document.getElementById("audioClock");
  tone.volume = 0.2;
  tone.play();
 }

 const playToneStart = () => {
  const tone = document.getElementById("audioRacing");
  tone.volume = 0.2;
  tone.play();
 }


  const handleActive = () => {
    setIsActive(!isActive)
  }

  const addSec = () => {
    setPomoSecond(pomoSecond => pomoSecond + 1)
  }

  const subSec = () => {
    pomoSecond === 0
    ? setPomoSecond(0)
    : setPomoSecond(pomoSecond => pomoSecond - 1)
  }

  const addAmount = () => {
    setAmount(amount => amount + 1)
  }

  const subAmount = () => {
   amount === 0
   ? setAmount(0)
   : setAmount(amount => amount - 1)
    
  }
      
  return (  
    <div>
    <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662663906/mixkit-racing-countdown-timer-1051_mcd5op.wav" id="audioRacing">
    </audio>
    <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662664556/mixkit-clock-bells-hour-signal-1069_m0vcfy.wav" id="audioClock">
    </audio>
    <button onClick={addSec}>ADD</button>
    <button onClick={subSec}>SUB</button>
    <button onClick={addAmount}>Add Amount</button>
    <button onClick={subAmount}>Sub Amount</button>
    <button onClick={handleActive}>Start Timer</button>
    <p>Pomo Seconds: {pomoSecond}</p>
    <p>Pomo Minute: {pomoMinute}</p>
    <p>Pomo Minute: {showMinute}</p>
    <p>Break Seconds: {breakSecond}</p>
    <p>Break Minute: {breakMinute}</p>
    <p>Amount: {amount}</p>
    </div>
  )
}

export default App;
