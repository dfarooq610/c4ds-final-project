import React, { useState } from "react";

const AcreInteractive = () => {
  const [showResults, setShowResults] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(50);
  const correctAnswer = 76;


  const fillStyle = {
    position: "absolute",
    width: `${fillPercentage}%`,
    height: "100%",
    backgroundColor: "rgba(255, 165, 0, 0.5)", // Semi-transparent orange
  };

  const sliderContainerStyle = {
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: "100%",
    paddingTop: "5px",
    transform: "translateX(-50%)",
  };

  return (
    <figure className="FootballFieldContainer">
      {/* <h4>Understanding the extent of acreage burned in the Carlton Complex Fire</h4> */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <div style={fillStyle}></div>
          <img
            src="/assets/footballField.png"
            alt="football field"
            className="FootballField"
          />
          <div style={sliderContainerStyle}>
            <input
              type="range"
              min="0"
              max="100"
              value={fillPercentage}
              onChange={(e) => setFillPercentage(e.target.value)}
              onMouseUp={() => setShowResults(true)}
              onMouseDown={() => setShowResults(false)}
              className="custom-range-slider"
              style={{ width: "100%" }} 
            />
          </div>
        </div>
      {showResults && (
        <p>
          One acre is about <strong>76%</strong> of a football field including
          the touchdown zones. That is extends to approximately the 85 yard line
          (including touchdown zones)
        </p>
      )}
    </figure>
  );
};

export default AcreInteractive;
