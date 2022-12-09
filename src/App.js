import React, {useState, useRef} from 'react'
import {PlayArrow, Pause, Stop} from '@mui/icons-material'
import './App.css';
import MyDrawer from "./components/Drawer"

function App() {
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
  const sequence = {
    type: 'WorkRest',
    workTime: 10,
    restTime: 10,
    workNames: [
      'Round 1',
      'Round 2',
      'Round 3'
    ],
    restNames: [
      'Rest 1',
      'Rest 2'
    ]
  }
  const {timerName} = chronometer

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => 
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
    setTimer(sequence.restTime)
    return(
      {
        ...c,
        timerName: sequence.restNames[c.timerIdx],
        timerCounter: c.timerCounter - 1,
        timerIdx: c.timerIdx + 1,
        restFlag: true
      }
    )
  }

  const configWorkTimer = (c) => {
    setTimer(sequence.workTime)
    return(
      {
        ...c,
        timerName: sequence.workNames[c.timerIdx],
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
    setTimer(sequence.workTime)
    const resetObject = {
      timerName: 'Round 1',
      timerCounter: 4,
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
