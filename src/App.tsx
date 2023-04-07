import { useState } from "react";
// @ts-ignore
import Chapter1 from "./pages/Chapter1";
import "./utils/styles/style.scss";
// import { ReactComponent as Lightning } './assets/lightning.svg';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>Flee</h1>
        <h2>Mapping the Increasing Impacts of Wildfires in the West</h2>
        <p className="Description">
          The fire starts from a lightning strike on July 15th, 2014 and ended
          on August 14th, 2014. However, impacts from the fire were felt much
          longer than the timeline of the official event.
        </p>
      </div>
        <Chapter1/>
    </div>
  );
}

export default App;
