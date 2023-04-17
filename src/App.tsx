import { useState, useEffect } from 'react'
// @ts-ignore
import Chapter1 from "./pages/Chapter1";
// @ts-ignore
import Chapter2 from "./pages/Chapter2.jsx";
// @ts-ignore
import Chapter3 from "./pages/Chapter3.jsx";
// @ts-ignore
import Introduction from "./pages/Introduction.jsx";
// @ts-ignore
import Navigation from "./components/Navigation";
import "./utils/styles/style.scss";

// Crackle
function Footer({}) {
  return(
    <footer className="DarkMode">
      <h5>By Jovi Dai, Joli Holmes, and Danish Farooq</h5>
    </footer>
  )
}

function App() {
  return (
    <div className="App">
    <main>
      <Navigation/>
      <div>
        <Introduction/>
        {/* <Chapter1/> */}
        <Chapter2/>
        <Chapter3/>
      </div>
    </main>
    <Footer/>
    </div>
  );
}

export default App;
