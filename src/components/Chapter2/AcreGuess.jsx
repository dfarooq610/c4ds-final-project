import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AcreSlider = ({ value, onChange, width }) => {
  return (
    <Slider
      value={value}
      onChange={onChange}
      trackStyle={{
        borderColor: "orange",
        backgroundColor: "orange",
        height: 10,
      }}
      handleStyle={{
        borderColor: "black",
        backgroundColor: "black",
        justifySelf: "center",
      }}
      railStyle={{ height: 10 }}
      style={{ width: width }}
    />
  );
};

const AcreGuess = () => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const handleChange = (value) => {
    setFillPercentage(value);
  };

  const handleImageLoad = (event) => {
    setImageWidth(event.target.clientWidth);
  };

  const fillStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${fillPercentage}%`,
    height: "100%",
    backgroundColor: "rgba(255, 165, 0, 0.5)", // Semi-transparent orange
    pointerEvents: "none", // Allow interaction with the slider
  };

  return (
    <div>
      <figure>
        <h3>
          Figure 1: Understanding the extent of acreage burned in the Carlton
          Complex Fire
        </h3>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/footballField.png"
            alt="Football Field"
            onLoad={handleImageLoad}
          />
          <div style={fillStyle}></div>
        </div>
      </figure>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <AcreSlider
          value={fillPercentage}
          onChange={handleChange}
          width={imageWidth}
        />
      </div>
    </div>
  );
};

export default AcreGuess;
