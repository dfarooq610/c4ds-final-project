// @ts-ignore
import * as d3 from 'd3';
import { useEffect } from 'react'

function Header({}) {

    const hamburger = d3.select(".ham");
    const navsub = d3.select(".nav-sub");

    useEffect(() => {
      hamburger.on("click", function(e, d) {
        console.log(e, d)
        hamburger.classList.toggle("change");
        navsub.classList.toggle("nav-change");
      });
    });

    return(
        <header>
            <nav className="navbar">
            <div className="ham">
                <span className="bar1"></span>
                <span className="bar2"></span>
                <span className="bar3"></span>
            </div>
            <ul className="nav-sub">
                <li className="list-item"><a href="#Introduction" className="nav-link">Introduction</a></li>
                <li className="list-item"><a href="#Chapter1" className="nav-link">Chapter 1</a></li>
                <li className="list-item"><a href="#Chapter2" className="nav-link">Chapter 2</a></li>
                <li className="list-item"><a href="#Chapter3" className="nav-link">Chapter 3</a></li>
            </ul>
            </nav>
        </header>
    );
}

export default function Introduction({}) {

    return(
        <div className="IntroductionContainer DarkMode">
            <Header/>
            <article>
                <h1>To Flee or to Face</h1>
                <h2>Reflecting Mapping the Increasing Impacts of Wildfires in the West</h2>
                <div>
                <p>In July 2014, lightning ignited a small fire in the Methow Valley, a remote area in eastern part of Washington State. Weeks of hot and dry weather left the valley particularly susceptible to fires that summer. Fortunately, several local residents saw the fire and rushed to extinguish it.</p>
                <p>How did a small contained fire turn into one of the largest fires in Washington State's history? Local residents Danny and Vicki Yanarella share their knowledge. </p>
                </div>
            </article>
            <img className="lightning" src="./assets/lightning.svg" alt="lightning strike"/>
        </div>
      )
}

