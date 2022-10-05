import React, {useState, useEffect} from 'react'
import './App.css';
import MyDrawer from "./components/Drawer"

function App() {
  const [sec, setSec] = useState(0);

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
            00:{("0" + Math.floor((sec / 60000) % 60)).slice(-2)}:{("0" + Math.floor((sec / 2000) % 60)).slice(-2)}
          </p>
        </header>
      </div>
    </MyDrawer>
  );
}

export default App;
