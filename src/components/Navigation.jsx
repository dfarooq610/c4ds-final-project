// @ts-ignore
import * as d3 from 'd3';
import { useEffect } from 'react'

export default function Navigation() {

    const hamburger = d3.select(".ham");
    const navsub = d3.select(".nav-sub");

    // useEffect(() => {
      hamburger.on("click", function(e, d) {
        console.log(e, d)
        hamburger.attr("class", "change")
        navsub.attr("class", "nav-change")
        // hamburger.classList.toggle("change");
        // navsub.classList.toggle("nav-change");
      });
    // });

    return(
        <nav className="section-nav navbar">
            <div className="ham">
                <span className="bar1"></span>
                <span className="bar2"></span>
                <span className="bar3"></span>
            </div>
            <ol className="nav-sub">
                <li className="list-item"><a href="#Introduction" className="nav-link">Introduction</a></li>
                <li className="list-item"><a href="#Chapter1" className="nav-link">Fire</a></li>
                <li className="list-item"><a href="#Chapter2" className="nav-link">Impacts</a></li>
                <li className="list-item"><a href="#Chapter3" className="nav-link">Response</a></li>
            </ol>
        </nav>
    );
}
