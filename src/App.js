import React, {useState, useEffect, useRef} from 'react'
import {PlayArrow, Pause, Stop} from '@mui/icons-material'
import './App.css';
import MyDrawer from "./components/Drawer"

function App() {
  const [sec, setSec] = useState(0);
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer +1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  useEffect(() => {
    let interval = null
    interval = setInterval(() => {
      setSec((sec) => sec + 1000);
    }, 1000);
  }, [])


  return (
    <MyDrawer>
      <div className="App">
        <header className="App-header">
          <p>
            A chronometer for everything!
          </p>
          <p>
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
            <button onClick={handleReset}>
              <Stop fontSize='large' sx={{color: '#fff'}}/>
            </button>
          </div>
        </header>
      </div>
    </MyDrawer>
  );
}

export default App;
