import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Scrollama, Step } from 'react-scrollama';
import stateBoundaries from "../data/state_boundaries.json";
import countyBoundaries from "../data/counties_geo.json";
import complex from "../data/complex_data.json";
import countyBigStreets from "../data/county_bigstreets_reg.json";
import countyMedStreets from "../data/county_medstreets_reg.json";
import shelters from "../data/shelters.json";
import fires from "../data/fire_points2.json";
import fireBoundary from "../data/fire_boundary.json";
import cityBoundaries from "../data/city_poly.json";
import routes from "../data/route_sim2.json";
import * as d3 from 'd3';

import { initLegendVis } from "../components/Legend";
import { initBurnVis } from "../components/Burn";
import { uniqueArray } from "../utils/global";

const mainVis = "Main-Vis";
const timelineVis = "Timeline-Vis";
const containmentVis = "Containment-Vis";
const burnVis = "Burn-Vis";
const legendVis = "Burn-Vis";

let projection;

let xScaleTimeline, colorScale, rScale;

function initMainVis() {

    const width =  500, height =  300, initialScale = 20000,
        initialCenterX = -24,
        initialCenterY = 48.25;

    d3.select(`#${mainVis}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            // .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("preserveAspectRatio", "xMidYMid meet")
            // .classed("svg-content", true);

    projection = d3.geoAlbers()
            .translate([width / 2, height / 2])
            .scale(initialScale)
            .center([initialCenterX, initialCenterY]);
}

// Create days label
// Description an array for each date 
// Return array
export function daysLabel(days, dates) {
    let days2 = []
    days.forEach(function(d) {

        let x = dates.filter(function(j) {
            return j.date === d;
        });
        days2.push(x[0].day)
    })

    return days2;
}

function initTimelineVis(complex) {

    const width = 1000, height = 100;
    const margin = {top: 0, right: 10, bottom: 50, left: 10};

    const days = uniqueArray(complex, "date").sort(function(a, b) {return a - b});
    const days2 = daysLabel(days, complex);
    const xWidth = (width - margin.left - margin.right)/days.length;

    const min = d3.min(complex, function(d) {return d.date; });
    const max = d3.max(complex, function(d) {return d.date; });
    const barHeight = 50;

    xScaleTimeline = d3.scaleBand()
        .domain(days)
        .range([margin.left, width - margin.right])
        .paddingInner(0.5)
        .paddingOuter(0.2);

    let svg = d3.select(`#${timelineVis}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${height}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    const july = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17/2)
        .attr("y", height-margin.bottom/4)
        .text("July");

    const august = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17 + xWidth*27/2)
        .attr("y", height-margin.bottom/4)
        .text("August");

    const xAxisTimeline = svg
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleTimeline).tickValues(days).tickFormat((d, i) => days2[i]));

    svg
        .append("rect")
        .attr("x", xScaleTimeline(min))
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width", xScaleTimeline.bandwidth())
        .attr("height", barHeight)
        .attr("fill", "#FFFFFF")
}

function initContainmentVis() {

    const margin = {top: 0, right: 10, bottom: 20, left: 10};
    const min = 0, max = 100, barHeight = 50;
    const width = 400, height = 100;

    let svg = d3.select(`#${containmentVis}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${height}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    let xScaleContainment = d3.scaleLinear()
        .domain([min, max])
        .range([margin.left, width - margin.right]);

    svg
        .append("rect")
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", xScaleContainment(min))
        .attr("height", barHeight)
        .attr("fill", "#FFFFFF")

    let xAxisContainment = svg
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleContainment).ticks(2));
}

export default function Chapter1 ({}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    initMainVis();
    initTimelineVis(complex);
    initContainmentVis();
    initBurnVis(burnVis, complex);
    initLegendVis(legendVis, fires);
  }, [])

  return (
    <div style={{ margin: '50vh 0', border: '2px dashed skyblue' }}>
      <div style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}>
        <div>
            <div id="main">
                <div className="chart" id={mainVis}></div>
                <div className="chart" id={timelineVis}></div>
            </div>
            {/* <div id="sidebar-right">
                <div className="container" style="margin-top: 0px">
                    <h3 style="margin-left:0;margin-top:0">Percent fire contained</h3>
                    <div id="containment"></div>
                </div>
                <div className="container">
                    <h3 style="margin-left:0">Acres burnt (square acres)</h3>
                    <div id="burn"></div>
                </div>
                <div className="container">
                    <p id="story"></p>
                </div>
            </div> */}
        </div>

        I'm sticky. The current triggered step index is: {currentStepIndex}
      </div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter} debug>
        {[1, 2, 3, 4].map((_, stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              style={{
                margin: '50vh 0',
                border: '1px solid gray',
                opacity: currentStepIndex === stepIndex ? 1 : 0.2,
              }}
            >
              I'm a Scrollama Step of index {stepIndex}
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  );
};