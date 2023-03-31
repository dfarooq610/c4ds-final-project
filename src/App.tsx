import { useState } from 'react'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";
import "./utils/styles/style.scss";
import Lightning from './assets/lightning.svg';

function App() {

  return (
    <div className="App">
      <div>
        <h1>Flee</h1>
        <h2>Mapping the Increasing Impacts of Wildfires in the West</h2>
      </div>
        <Chapter1></Chapter1>
    </div>
  )
}

export default App
