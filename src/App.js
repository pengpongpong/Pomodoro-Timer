import './index.css';
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {incrementSession, decrementSession, sessionCount, setSessionByAmount} from "./redux/session.js";
import {incrementPomoMinute, decrementPomoMinute, setPomoMinuteByAmount, pomoMinuteCount, decrementPomoSecond, pomoSecondCount, decrementPomoSecondByAmount, decrementPomoMinuteAuto} from "./redux/pomoTime.js";
import {decrementBreakMinute, setBreakMinuteByAmount, decrementBreakSecond, breakMinuteCount, breakSecondCount} from "./redux/breakTime.js";

function App() {
  const [isOn, setIsOn] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [breakActive, setBreakActive] = useState(false);

  // redux state
  const dispatch = useDispatch();
  const amount = useSelector(sessionCount);
  const pomoMinute = useSelector(pomoMinuteCount);
  const pomoSecond = useSelector(pomoSecondCount);
  const breakMinute = useSelector(breakMinuteCount);
  const breakSecond = useSelector(breakSecondCount);

  // show time, add 0 in front, when minute/second is < 10 
  const displayPomoMinute = pomoMinute < 10 ? "0" + pomoMinute : pomoMinute;
  const displayPomoSecond = pomoSecond < 10 ? "0" + pomoSecond : pomoSecond;
  const displayBreakMinute = breakMinute < 10 ? "0" + breakMinute : breakMinute;
  const displayBreakSecond = breakSecond < 10 ? "0" + breakSecond : breakSecond;

  // POMO TIMER
  // pomo timer second decrease
  useEffect(() => {
    if (isActive && amount !== 0 && isOn) {
      const timer = setInterval(() => dispatch(decrementPomoSecond()), 1000);  

        return () => clearInterval(timer);
      // eslint-disable-next-line 
      }}, [isActive, amount, isOn])

  // pomo timer minute decease
  useEffect(() => {
    if (pomoSecond === 0 && pomoMinute > 0 && isActive && isOn) { 
      setTimeout(() => {
        dispatch(decrementPomoMinuteAuto())
      }, 1000)     
    }
    // eslint-disable-next-line 
  }, [pomoSecond, pomoMinute, isActive, isOn])

  // pomo timer end
  useEffect(() => {
    if (pomoMinute === 0 && pomoSecond === 0 && isActive && isOn) {
      setTimeout(() => {
        playToneBreak();
        dispatch(setBreakMinuteByAmount(5))
        setBreakActive(!breakActive)
        setIsActive(!isActive)
      }, 1000)
    }
    // eslint-disable-next-line 
  }, [pomoSecond, pomoMinute, isActive, isOn])

  // BREAK TIMER
  // break timer second decrease
  useEffect(() => {
    if (breakActive && amount !== 0 && isOn) {
      const timer = setInterval(() => dispatch(decrementBreakSecond()), 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line 
  }, [breakActive, amount, isOn])

  // breaktimer minute decrease
  useEffect(() => {
    if (breakSecond === 0 && breakMinute > 0 && breakActive && isOn) {
      setTimeout(() => {
        dispatch(decrementBreakMinute())
      }, 1000)  
    }
    // eslint-disable-next-line 
  }, [breakSecond, breakMinute, breakActive, isOn])

  // break timer end
  useEffect(() => {
    if (breakMinute === 0 && breakSecond === 0 && breakActive && isOn) {
      setTimeout(() => {
        playToneStart()
        dispatch(setPomoMinuteByAmount(25))
        dispatch(decrementSession())
        setIsActive(!isActive)
        setBreakActive(!breakActive)
      }, 1000)   
    }
    // eslint-disable-next-line 
  }, [breakSecond, breakMinute, breakActive, isOn])

  // change html title to timer, when active
  useEffect(() => {
    const title = () => {
      breakActive 
      ? document.title = `Break! ${displayBreakMinute}:${displayBreakSecond} left` 
      : isActive 
      ? document.title = `Focus! ${displayPomoMinute}:${displayPomoSecond} left`
      : document.title = "Pomodoro-Timer"
    };
    title()
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
    dispatch(decrementPomoSecondByAmount(0));
    dispatch(setSessionByAmount(4));
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
