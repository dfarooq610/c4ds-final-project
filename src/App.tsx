import { useState } from 'react'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";
import "./utils/styles/style.scss";
// import { ReactComponent as Lightning } './assets/lightning.svg';

function Header({}) {
  return(
    <header>
        <h1>Flee</h1>
        <h2>Mapping the Increasing Impacts of Wildfires in the West</h2>
        <p>On July 15th, 2014, lightning struck in the Methow Valley, a remote area in eastern part of Washington State, igniting a small fire. Weeks of hot and dry weather had left the valley particularly susceptible to fires that summer. Fortunately, several local residents saw the fire and rushed to extinguish it. Local residents share their knowledge of how a small contained fire turned into one of the largest fires in Washington State's history.</p>
    </header>
  )
}

function Introduction({}) {
  return(
    <div className="Introduction">
      <Header/>
      <img src="./src/assets/lightning.svg"/>
  </div>
  )
}

function Landing({}) {
  return(
  <div className="Landing">
      <Introduction/>
  </div>)
}

function Footer({}) {
  return(
    <footer>
      <h4>By Jovi Dai, Joli Holmes, and Danish Farooq </h4>
    </footer>
  )
}

function App() {

  return (
    <div className="App">
      <div className="Main">
        <Landing/>
        <div className="Chapters">
          {/* <Chapter1></Chapter1> */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
