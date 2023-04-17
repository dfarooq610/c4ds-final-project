import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Scrollama, Step } from 'react-scrollama';
import complex from "../data/complex_data.json";
import fires from "../data/fire_points2.json";

import { initContainmentVis } from "../components/Chapter1/Containment";
import { initLegendVis } from "../components/Chapter1/Legend";
import { initBurnVis } from "../components/Chapter1/Burn";
import { initTimelineVis } from "../components/Chapter1/Timeline";
import { initMapVis, updateMapVis } from "../components/Chapter1/Map";

const mapVis = "Map-Vis";
const timelineVis = "Timeline-Vis";
const containmentVis = "Containment-Vis";
const burnVis = "Burn-Vis";
const legendVis = "Legend-Vis";

export default function Chapter1 () {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  let complexFiltered = complex.filter(d => d.story !== "");

  useEffect(() => {
    initMapVis(mapVis);
    // initTimelineVis(timelineVis, complex);
    // initContainmentVis(containmentVis);
    // initBurnVis(burnVis, complex);
    initLegendVis(legendVis, fires);
  }, [])

  useEffect(() => {

    if (currentStepIndex !== null) {
      updateMapVis(mapVis, complexFiltered[currentStepIndex].date__1);
      // updateBurnVis(burnVis)
    }
  }, [currentStepIndex])

  let arr = Array.from(Array(complexFiltered.length).keys());

  return (
    <section id="Chapter1" className="DarkMode">
      <div className="ChapterContainer ChapterContainer1">
        <header>
          <h2>Fire</h2>
          <h3 className="Chapter1Subtitle">
            From Contained to Catastrophe
          </h3>
        </header>
        <div className="Chart-Wrapper" style={{ position: 'sticky', top: 20, right: 20}}>
          <div className="Chart-Container">
              <div className="MainChart">
                  <div className="chart" id={mapVis}></div>
                  <div className="chart" id={burnVis}></div>
              </div>
              <div className="SideBar">
                  <div className="chart" id={legendVis}></div>
              </div>
          </div>
        </div>
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          {arr.map((_, stepIndex) => (
            <Step data={stepIndex} key={stepIndex}>
              <div
                style={{
                  margin: '50vh 0',
                  border: '1px',
                  opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                }}
                className="step"
              >
                <p className="date">{complexFiltered[stepIndex].month_name + " " + complexFiltered[stepIndex].day}</p>
                <p className="story">{complexFiltered[stepIndex].story}</p>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </section>
  );
};
