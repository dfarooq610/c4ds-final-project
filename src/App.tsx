import * as d3 from 'd3';
import { useState, useEffect } from 'react'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";
import "./utils/styles/style.scss";
// import { ReactComponent as Lightning } './assets/lightning.svg';

function Header({}) {

  // useEffect(() => {
  //   const hamburger = d3.select(".ham");
  //   const navsub = d3.select(".nav-sub");
  
  //   hamburger.addEventListener('click', () => {  
  //     hamburger.classList.toggle("change")  
  //     navsub.classList.toggle("nav-change")  
  //   });
  // })

  return(
    <header>
      <nav className="navbar">
          <div className="ham">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        <ul className="nav-sub">
          <li className="list-item"><a href="#" className="nav-link">Introduction</a></li>
          <li className="list-item"><a href="#" className="nav-link">Chapter 1</a></li>
          <li className="list-item"><a href="#" className="nav-link">Chapter 2</a></li>
          <li className="list-item"><a href="#" className="nav-link">Chapter 3</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Introduction({}) {

  return(
    <div className="Introduction">
      <article>
        <h1>Flee</h1>
        <h2>Mapping the Increasing Impacts of Wildfires in the West</h2>
        <div>
          <p>In July 2014, lightning ignited a small fire in the Methow Valley, a remote area in eastern part of Washington State. Weeks of hot and dry weather left the valley particularly susceptible to fires that summer. Fortunately, several local residents saw the fire and rushed to extinguish it.</p>
          <p>How did a small contained fire turn into one of the largest fires in Washington State's history? Local residents Danny and Vicki Yanarella share their knowledge. </p>
        </div>
      </article>
      <img className="lightning" src="./src/assets/lightning.svg"/>
    </div>
  )
}

function Landing({}) {
  return(
    <div className="Landing">
      <Header/>
      <Introduction/>
    </div>
  )
}

function Footer({}) {
  return(
    <footer>
      <h4>By Jovi Dai, Joli Holmes, and Danish Farooq</h4>
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
