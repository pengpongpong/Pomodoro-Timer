import './index.css';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {incrementSession, decrementSession, sessionCount} from "./redux/sessionSlice.js";
import {incrementPomoMinute, decrementPomoMinute, setPomoMinuteByAmount, pomoMinuteCount, decrementPomoSecond, pomoSecondCount, decrementPomoSecondByAmound} from "./redux/pomoTime.js";
import {decrementBreakMinute, setBreakMinuteByAmount, decrementBreakSecond, breakMinuteCount, breakSecondCount} from "./redux/breakTime.js"

function App() {
  const [isOn, setIsOn] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [breakActive, setBreakActive] = useState(false);

  // redux state
  const dispatch = useDispatch();
  const amount = useSelector(sessionCount);
  const pomoMinute = useSelector(pomoMinuteCount);
  const pomoSecond = useSelector(pomoSecondCount);
  const breakMinute = useSelector(breakMinuteCount);
  const breakSecond = useSelector(breakSecondCount);

  // show time, add 0 in front, when < 10 
  const displayPomoMinute = pomoMinute < 10 ? "0" + pomoMinute : pomoMinute;
  const displayPomoSecond = pomoSecond < 10 ? "0" + pomoSecond : pomoSecond;
  const displayBreakMinute = breakMinute < 10 ? "0" + breakMinute : breakMinute;
  const displayBreakSecond = breakSecond < 10 ? "0" + breakSecond : breakSecond;

  // Pomo Timer
  useEffect(() => {
    if (isActive && amount !== 0 && isOn) {
      const timer = setInterval(() => dispatch(decrementPomoSecond()), 1000);     
      
        if (pomoSecond === 0) { 
          setTimeout(() => {
            console.log("useEffect")
            // setPomoSecond(59);
            dispatch(decrementPomoMinute())
          }, 1000)     
        }

        if (pomoMinute === 0 && pomoSecond === 0) {
          setTimeout(() => {
            clearInterval(timer)
            playToneBreak();
            setIsActive(!isActive)
            setBreakActive(!breakActive)
            dispatch(setBreakMinuteByAmount(5))
          }, 1000)
        }

        return () => clearInterval(timer);
        // eslint-disable-next-line 
      }}, [pomoSecond, pomoMinute, isActive, breakActive, amount, isOn])
  
  // Break Timer
  useEffect(() => {
    if (breakActive && amount !== 0 && isOn) {
      const timer = setInterval(() => dispatch(decrementBreakSecond()), 1000);

      if (breakSecond === 0) {
        setTimeout(() => {
          dispatch(decrementBreakMinute())
        }, 1000)  
      }

      if (breakMinute === 0 && breakSecond === 0) {
        setTimeout(() => {
          clearInterval(timer)
          playToneStart()
          setBreakActive(!breakActive)
          setIsActive(!isActive)
          dispatch(setPomoMinuteByAmount(25))
        }, 900)   
      }

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line 
  }, [breakSecond, breakMinute, pomoMinute, breakActive, isActive, amount, isOn])

  // change html title to timer, when active
  useEffect(() => {
    const title = () => {
      breakActive 
      ? document.title = `Break! ${displayBreakMinute}:${displayBreakSecond}` 
      : isActive 
      ? document.title = `Focus! ${displayPomoMinute}:${displayPomoSecond}`
      : document.title = "Pomodoro-Timer"
    };

    if (isActive || breakActive) {
      title()
    }
    if (!isActive && !breakActive) {
      title()
    }
  })

  // sound break
  const playToneBreak = () => {
    const tone = document.getElementById("audioBreak");
    tone.volume = 0.05;
    tone.play();
  }
  // sound focus
  const playToneStart = () => {
    const tone = document.getElementById("audioStart");
    tone.volume = 0.05;
    tone.play();
  }
  // start
  const handleActive = () => {
    setIsActive(!isActive);
  }
  // pause
  const pause = () => {
    setIsOn(!isOn);
  }
  // reset
  const reset = () => {
    setIsActive(false);
    setBreakActive(false);
    dispatch(setPomoMinuteByAmount(25));
    dispatch(decrementPomoSecondByAmound(0));
    
  }
      
return (  
  <div className="timer">
    <h1 className="head">Pomodoro-Timer</h1>
    <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662663906/mixkit-racing-countdown-timer-1051_mcd5op.wav" id="audioStart">
    </audio>
    <audio src="https://res.cloudinary.com/pengpengong/video/upload/v1662664556/mixkit-clock-bells-hour-signal-1069_m0vcfy.wav" id="audioBreak">
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
        <div className="button" onClick={() => dispatch(incrementPomoMinute())}>➕ time</div>
        <div className="button" onClick={() => dispatch(decrementPomoMinute())}>➖ time</div>
        <div className="button" onClick={() => dispatch(incrementSession())}>➕ session</div>
        <div className="button" onClick={() => dispatch(decrementSession())}>➖ session</div>
      </div>
      <div className="startStop">
        <div className="button" onClick={handleActive}>start</div>
        <div className="button" onClick={pause}>Pause</div>
        <div className="button" onClick={reset}>Reset</div>
      </div>
    </div>
  </div>
)
}

export default App
