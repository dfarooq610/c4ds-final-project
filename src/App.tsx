import { useState } from "react";
// @ts-ignore
import Chapter1 from "./pages/Chapter1";
// @ts-ignore
import Chapter2 from "./pages/Chapter2.jsx";
// @ts-ignore
import Chapter3 from "./pages/Chapter3.jsx";
import "./utils/styles/style.scss";
function Header({}) {
  return (
    <header>
      <h1>Flee</h1>
      <h2>Mapping the Increasing Impacts of Wildfires in the West</h2>
      <h4>By Jovi Dai, Joli Holmes, and Danish Farooq </h4>
      <p>
        On July 15th, 2014, lightning struck in the Methow Valley, a remote area
        in eastern part of Washington State, igniting a small fire. Weeks of hot
        and dry weather had left the valley particularly susceptible to fires
        that summer. Fortunately, several local residents saw the fire and
        rushed to extinguish it. Local residents share their knowledge of how a
        small contained fire turned into one of the largest fires in Washington
        State's history.
      </p>
    </header>
  );
}

function Introduction({}) {
  return (
    <div className="Introduction">
      <Header />
      <img src="/lightning.svg" />
    </div>
  );
}

function Landing({}) {
  return (
    <div className="Landing">
      <Introduction />
    </div>
  );
}

function Footer({}) {
  return <footer></footer>;
}

function App() {
  return (
    <div className="App">
      <Landing />
      <div className="Chapters">
        <Chapter1 />
        <Chapter2 />
        {/* <Chapter3 /> */}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
