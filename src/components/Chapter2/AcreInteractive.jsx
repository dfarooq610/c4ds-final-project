import React, { useState } from "react";

const AcreInteractive = () => {
  const [showResults, setShowResults] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(50);
  const correctAnswer = 75.7;

  const fillStyle = {
    position: "absolute",
    width: `${fillPercentage}%`,
    height: "100%",
    backgroundColor: "rgba(255, 165, 0, 0.5)", // Semi-transparent orange
  };

  const userGuessBarStyle = {
    position: "absolute",
    left: `${fillPercentage}%`,
    height: "100%",
    width: "8px",
    backgroundColor: "#844610",
    zIndex: 1,
    display: showResults ? "block" : "none",
  };

  const correctAnswerBarStyle = {
    position: "absolute",
    left: `${correctAnswer}%`,
    height: "100%",
    width: "8px",
    backgroundColor: "#282525",
    zIndex: 1,
    display: showResults ? "block" : "none",
  };

  const sliderContainerStyle = {
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: "100%",
    paddingTop: "5px",
    zIndex: 2,
    transform: "translateX(-50%)",
    margin: "0 auto",
  };

  return (
    <figure className="FootballFieldContainer">
      <h4>
        Understanding the extent of acreage burned in the Carlton Complex Fire
      </h4>
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <div style={fillStyle}></div>
        <div style={userGuessBarStyle}></div>
        <div style={correctAnswerBarStyle}></div>
        <img
          src="/assets/footballField.png"
          alt="an image of a football field with endzones included. Users can drag a slider beneath the image to understand how big an acre is."
          className="FootballField"
        />
        <div style={sliderContainerStyle}>
          <input
            type="range"
            min="0"
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
        <figcaption style={{marginTop: ".5rem"}}>
          One acre extends roughly to the <strong>85 yard line</strong> including
          the touchdown zones. That is approximately 75.7% of the length of a football field.
        </figcaption>
      )}
    </figure>
  );
};

export default AcreInteractive;
