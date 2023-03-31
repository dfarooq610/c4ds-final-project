import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Scrollama, Step } from 'react-scrollama';
import complex from "../data/complex_data.json";
import shelters from "../data/shelters.json";
import fires from "../data/fire_points2.json";
import fireBoundary from "../data/fire_boundary.json";
import routes from "../data/route_sim2.json";
import * as d3 from 'd3';

import { initContainmentVis } from "../components/Containment";
import { initLegendVis } from "../components/Legend";
import { initBurnVis } from "../components/Burn";
import { initTimelineVis } from "../components/Timeline";
import { initMapVis } from "../components/Map";
import { uniqueArray } from "../utils/global";

const mapVis = "Map-Vis";
const timelineVis = "Timeline-Vis";
const containmentVis = "Containment-Vis";
const burnVis = "Burn-Vis";
const legendVis = "Burn-Vis";

export default function Chapter1 ({}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    initMapVis(mapVis);
    initTimelineVis(timelineVis, complex);
    initContainmentVis(containmentVis);
    initBurnVis(burnVis, complex);
    initLegendVis(legendVis, fires);
  }, [])

  return (
    <div style={{ margin: '50vh 0', border: '2px dashed skyblue' }}>
      <div style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}>
        <div>
            <div id="main">
                <div className="chart" id={mapVis}></div>
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
