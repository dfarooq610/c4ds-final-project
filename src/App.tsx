import { useState } from 'react'
// @ts-ignore
import Chapter1  from "./pages/Chapter1";
import "./utils/styles/style.scss";
// import { ReactComponent as Lightning } './assets/lightning.svg';

function Header({}) {

  // const hamburger = document.getElementsByClassName("hamburger")[0];
  // const mobileNavs = document.getElementsByClassName("nav-links")[0];

  // hamburger.addEventListener("click", () => {
  //   mobileNavs.classList.toggle("active")
  // })

  return(
    <header>
      <button className="hamburger"><img src="./src/assets/menu.svg" alt="menu toggle icon"/></button>
      <div className="nav-links">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#skill">Skills</a></li>
        </ul>
      </div>
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
            <p>How did a small contained fire turn into one of the largest fires in Washington State's history? Local Danny and Vicki Yanarella share their knowledge. </p>
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
