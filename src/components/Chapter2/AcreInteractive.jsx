import React, { useState } from "react";

const AcreInteractive = () => {
  const [showResults, setShowResults] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(50);
  const correctAnswer = 75.7;

  const fillStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${fillPercentage}%`,
    height: "100%",
    backgroundColor: "rgba(255, 165, 0, 0.5)", // Semi-transparent orange
  };

  const userGuessStyle = {
    position: "absolute",
    top: 0,
    left: `${fillPercentage}%`,
    width: "2px",
    height: "100%",
    backgroundColor: showResults ? "darkorange" : "transparent",
  };

  const correctAnswerStyle = {
    position: "absolute",
    top: 0,
    left: `${correctAnswer}%`,
    width: "2px",
    height: "100%",
    backgroundColor: showResults ? "#" : "transparent",
  };

  return (
    <figure>
      <h3>
        Figure 1: Understanding the extent of acreage burned in the Carlton
        Complex Fire
      </h3>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={fillStyle}></div>
        <div style={userGuessStyle} />
        <div style={correctAnswerStyle} />
        <img src="/footballField.png" alt="football field" />
        <figcaption style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={fillPercentage}
            onChange={(e) => setFillPercentage(e.target.value)}
            onMouseUp={() => setShowResults(true)}
            className="custom-range-slider"
          />
        </figcaption>
      </div>
      {showResults && (
        <div>
          <p>
            The Carlton Complex fire burned approximately{" "}
            <strong>{fillPercentage} acres</strong> of land.
          </p>
        </div>
      )}
    </figure>
  );
};

export default AcreInteractive;
