import AcreInteractive from "../components/Chapter2/AcreInteractive.jsx";
export default function Chapter2() {
  return (
    <div className="Chapter2Container">
      <header>
        <h1>Chapter 2</h1>
        <h2 className="Chapter2Subtitle">
          Measuring the impact of wildfires in the United States over the past
          decade
        </h2>
      </header>
      <article>
        <p>
          The Carlton Complex fire of 2014 marked a significant turning point in
          the United States' experience with wildfires. As the largest wildfire
          in Washington State's history, the Carlton Complex consumed over
          250,000 acres, destroyed more than 300 homes, and cost millions of
          dollars in damages. The devastation left behind by the firestorm
          served as a stark reminder of the potential danger and far-reaching
          consequences of wildfires in an era of climate change.
        </p>
        <AcreInteractive />
      </article>
    </div>
  );
}
