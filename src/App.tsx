import { useState } from 'react'
import './App.css'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";
import "./utils/styles/style.scss";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Chapter1></Chapter1>
    </div>
  )
}

export default App
