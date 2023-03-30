import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Chapter1></Chapter1>
    </div>
  )
}

export default App
