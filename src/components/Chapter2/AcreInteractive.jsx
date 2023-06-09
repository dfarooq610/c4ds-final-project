import React, { useState } from "react";
import NumberComparison from "./NumberComparison.jsx";

const AcreInteractive = () => {
  const [showResults, setShowResults] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(50);
  const correctAnswer = 75.7;

  const displayResults = () => setShowResults(true);
  const hideResults = () => setShowResults(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      displayResults();
    }
  };

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
    backgroundColor: "rgb(255, 136, 0)",
    zIndex: 1,
    display: showResults ? "block" : "none",
  };

  const correctAnswerBarStyle = {
    position: "absolute",
    left: `${correctAnswer}%`,
    height: "100%",
    width: "8px",
    backgroundColor: "#2E8C43",
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
      <label>
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
              onMouseUp={displayResults}
              onMouseDown={hideResults}
              onTouchStart={hideResults}
              onTouchEnd={displayResults}
              onKeyDown={handleKeyDown}
              className="custom-range-slider"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        {!showResults ? (
          <p style={{ marginTop: ".5rem" }}>
            <strong>How big is an acre?</strong> Use the slider to guess how big
            one acre is incomparison to a football field.
          </p>
        ) : (
          <aside style={{ marginTop: ".5rem" }}>
            <p>
              Your guess was the{" "}
              <strong className="orange">{fillPercentage} yard-line</strong>.
              The correct answer is the{" "}
              <strong className="green">85 yard-line</strong> (including the
              touchdown zones). That is approximately 76% of the length of a
              football field.
            </p>
            <p>
              So, what about the Carlton Complex fires? In the below figure, we
              conceptualize the scale to which the Carlton Complex Fire burned.
            </p>
          </aside>
        )}
      </label>

      {showResults && <NumberComparison />}
    </figure>
  );
};

export default AcreInteractive;
