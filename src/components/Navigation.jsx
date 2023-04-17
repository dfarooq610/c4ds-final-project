// @ts-ignore
import * as d3 from 'd3';
import { useEffect } from 'react'

export default function Navigation() {

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
        // <header>
        //     <nav className="navbar">
        //     <div className="ham">
        //         <span className="bar1"></span>
        //         <span className="bar2"></span>
        //         <span className="bar3"></span>
        //     </div>
        //     <ul className="nav-sub">
        //         <li className="list-item"><a href="#Introduction" className="nav-link">Introduction</a></li>
        //         <li className="list-item"><a href="#Chapter1" className="nav-link">Chapter 1</a></li>
        //         <li className="list-item"><a href="#Chapter2" className="nav-link">Chapter 2</a></li>
        //         <li className="list-item"><a href="#Chapter3" className="nav-link">Chapter 3</a></li>
        //     </ul>
        //     </nav>
        // </header>

        <nav className="section-nav">
            <div className="ham">
                <span className="bar1"></span>
                <span className="bar2"></span>
                <span className="bar3"></span>
            </div>
            <ol className="nav-sub">
                <li><a href="#Introduction">Introduction</a></li>
                <li><a href="#Chapter1">Fire</a></li>
                <li><a href="#Chapter2">Impacts</a></li>
                <li><a href="#Chapter3">Response</a></li>
            </ol>
        </nav>
    );
}
