import React from "react";

const NumberComparison = () => {
  return (
    <figure
      className="number-comparison"
      aria-label="a visualization between between a single and 250,000 acres"
    >
      <section className="one-px-container">
        <div className="number one-pixel" />
        <div className="label">An acre represented as one pixel</div>
      </section>
      <section className="large-px-container">
        <div
          className="number large-number"
          aria-label="250,000 acres where each acre is visualized by a pixel"
        />
        <div className="label">
          250,000 acres, the amount of land burned in the Carlton Complex
          wildfire, each represented by a pixel
        </div>
      </section>
    </figure>
  );
};

export default NumberComparison;
