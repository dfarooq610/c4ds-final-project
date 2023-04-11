import React, { useState } from "react";
import FootballFieldWithSlider from "./FootballFieldWithSlider";

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

  const sliderContainerStyle = {
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: "100%",
    paddingTop: "5px",
    transform: "translateX(-50%)",
  };

  return (
    <figure>
      <h3>
        Figure 1: Understanding the extent of acreage burned in the Carlton
        Complex Fire
      </h3>
      <FootballFieldWithSlider 
        onChange={(e) => { setFillPercentage(e.target.value); setShowResults(false); }}
        onMouseUp={() => setShowResults(true)}
        onMouseDown={() => setShowResults(false)}
      />
      {showResults && (
        <p>
          One acre is about <strong>75.7%</strong> of a football field including
          the touchdown zones. That is extends to approximately the 85 yard line
          (including touchdown zones)
        </p>
      )}
    </figure>
  );
};

export default AcreInteractive;
