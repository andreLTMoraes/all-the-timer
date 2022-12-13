import React, {useState, useRef, useContext, useEffect} from 'react'
import {PlayArrow, Pause, Stop} from '@mui/icons-material'
import './App.css';
import MyDrawer from "./components/Drawer"
import { AppContext } from './context/app'

import middleBeep from './assets/middle_beep.wav'
import endBeep from './assets/end_beep.wav'

function App() {
  const { sequence } = useContext(AppContext) 
  const [timer, setTimer] = useState(10)
  const [chronometer, setChronometer] = useState({
    timerName: 'Round 1',
    timerCounter: 4,
    timerIdx: 0,
    restFlag: false
  })
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)
  const {timerName} = chronometer

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => 
        sequence?.fiveBeeps && timer < 7 && timer > 1 ?
        playBeep(timer, middleBeep) :
        timer === 1 ?
        playBeep(timer, endBeep) :
        timer === 0 ?
        hasNext() :
        timer -1) 
    }, 1000)
  }

  const hasNext = () => {
    setChronometer((chronometer) => (
      chronometer.timerCounter === 0 ?
      handleReset(true) :
      chronometer.restFlag ?
      configWorkTimer(chronometer) :
      configRestTimer(chronometer)
    ))
  }

  const configRestTimer = (c) => {
    setTimer(sequence?.timer?.restTime)
    return(
      {
        ...c,
        timerName: sequence?.timer?.restNames[c.timerIdx],
        timerCounter: c.timerCounter - 1,
        timerIdx: c.timerIdx + 1,
        restFlag: true
      }
    )
  }

  const configWorkTimer = (c) => {
    setTimer(sequence?.timer?.workTime)
    return(
      {
        ...c,
        timerName: sequence?.timer?.workNames[c.timerIdx],
        timerCounter: c.timerCounter - 1,
        restFlag: false
      }
    )
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 1000)
  }

  const handleReset = (autoStop) => {                                                    
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(sequence?.timer?.workTime)
    const resetObject = {
      timerName: sequence?.timer?.workNames[0],
      timerCounter: (sequence?.timer?.workNames.length + sequence?.timer?.restNames.length) - 1,
      restFlag: false,
      timerIdx: 0
    }

    return (
    autoStop ?
    resetObject :
    setChronometer(resetObject)
    )
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  useEffect(() => {
    handleReset(false)
  }, [sequence])

  const playBeep = (timer, beep) => {
    new Audio(beep).play()
    return timer - 1
  }

  return (
    <MyDrawer>
      <div className="App">
        <header className="App-header">
          <p>
            A chronometer for everything!
          </p>
          <p className='timer'>
            {timerName}
          </p>
          <p className='timer'>
            {formatTime()}
            {/*00:{("0" + Math.floor((sec / 60000) % 60)).slice(-2)}:{("0" + Math.floor((sec / 2000) % 60)).slice(-2)}*/}
          </p>
          <div className='buttons'>
            {
              !isActive && ! isPaused ?
              <button onClick={handleStart}>
                <PlayArrow fontSize='large' sx={{color: '#fff'}}/>
              </button> :
              (
                isPaused ?
                <button onClick={handlePause}>
                  <Pause fontSize='large' sx={{color: '#fff'}}/>
                </button> :
                <button onClick={handleResume}>
                  <PlayArrow fontSize='large' sx={{color: '#fff'}}/>
                </button>
              )
            }
            <button onClick={() => handleReset(false)}>
              <Stop fontSize='large' sx={{color: '#fff'}}/>
            </button>
          </div>
        </header>
      </div>
    </MyDrawer>
  );
}

export default App;
