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

const mainVis = "Main-Vis";
const timelineVis = "Timeline-Vis";
const containmentVis = "Containment-Vis";
const burnVis = "Burn-Vis";
const legendVis = "Burn-Vis"

let projection;

function initMainVis() {

    const width =  500, height =  300, initialScale = 20000,
        initialCenterX = -24,
        initialCenterY = 48.25;

    d3.select(`#${mainVis}`)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .classed("svg-content", true);

    projection = d3.geoAlbers()
            .translate([width / 2, height / 2])
            .scale(initialScale)
            .center([initialCenterX, initialCenterY]);
}

function initTimelineVis() {

    const width = 1000, height = 100;

    d3.select(`#${timelineVis}`)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("svg-content", true);
}

function initContainmentVis() {

    // margin: {top: 0, right: 10, bottom: 20, left: 10}
    // barHeight: 50
    // min: 0
    // max: 100

    const width = 400, height = 100;

    d3.select(`#${containmentVis}`)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("svg-content", true);
}

function initBurnVis() {

    // margin: {top: 0, right: 10, bottom: 50, left: 10}
    // barHeight: 50

    const width = 400, height = 100;

    d3.select(`#${burnVis}`)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${width}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("svg-content", true);
}

function initLegendVis() {

    // margin: {top: 0, right: 10, bottom: 20, left: 10},
    // barHeight: 50

    const width = 200, height = 200;

    d3.select(`#${legendVis}`)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${width}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .classed("svg-content", true);
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
    initTimelineVis();
    initContainmentVis();
    initBurnVis();
    initLegendVis();
  }, [])

  return (
    <div style={{ margin: '50vh 0', border: '2px dashed skyblue' }}>
      <div style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}>
        <div id="main">
            <div className="chart" id={mainVis}></div>
            <div className="chart" id={timelineVis}></div>
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