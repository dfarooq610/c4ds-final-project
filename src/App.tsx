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
        <h3>By Jovi Dai, Joli Holmes, and Danish Farooq </h3>
        <p>On July 15th, 2014, lightning struck in the Methow Valley, a remote area in eastern Washington, igniting a small fire in Cougar Flats, an area above Perrigan Lake. Weeks of hot and dry weather had left the valley particularly susceptible to fires that summer. Fortunately, two local residents saw the fire and put it out. Local residents Danny and Vicki Yanarella share their knowledge of a small, contained fire turned into one of the largest fires in Washington State's history.</p>
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
    <footer></footer>
  )
}

function App() {

  return (
    <div className="App">
      <Landing/>
      <div className="Chapters">
        <Chapter1></Chapter1>

        <Chapter2></Chapter2>
        
        <Chapter3></Chapter3>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
