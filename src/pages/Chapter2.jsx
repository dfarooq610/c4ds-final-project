import AcreInteractive from "../components/Chapter2/AcreInteractive.jsx";
export default function Chapter2() {
  return (
    <section id="Chapter2" className="ChapterContainer LightMode">
      <div className="ChapterContainer2">
        <header>
          <h2 className="LightMode">Impacts</h2>
          <h3 className="Chapter2Subtitle">
            Measuring the impact of wildfires in Washington State over the past decade
          </h3>
        </header>
          {/* <h4>Geographic Impacts</h4> */}
          <div className="Row">
            <article>
              <p>
                The Carlton Complex fire marked a significant turning point in
                the Washington State's experience with wildfires. As the largest wildfire
                in Washington State's history, the Carlton Complex fire consumed over
                250,000 acres, destroyed more than 300 homes, and cost millions of
                dollars in damages.
              </p>
              <p>The fire burned the landscape so severly that it likely won't recover in our lifetimes.  
                The Carlton Complex fire significantly impacted the environment and
                public life during and after the event.
                The devastation serves as a stark reminder of the potential danger and far-reaching
                consequences of wildfires in an era of climate change. </p>
            </article>
            <AcreInteractive />
          </div>
          <article>
            <section>
              <h4>Environmental Impacts</h4>
              <p>
                The Carlton Complex fire destroyed large areas of vegetation. Vegetation 
                plays a critical role in the ecosystem by providing a habitat for wildlife, reducing
                soil erosion, and improving water quality. Local residents Debbie Grable and her husband, 
                George Grable, shared their knowledge of the fires' impacts. Debbie Grable explains <i>"the fire 
                destroyed large areas of forest, which will take years to regenerate. The 
                forest is a vital ecosystem component and provides essential benefits such 
                as carbon sequestration and habitat for wildlife."</i>
              </p>
              <p>
                Furthermore, the Carlton Complex fire impacted the water quality in the
                surrounding area. George Grable added, <i>"the fire destroyed vegetation, 
                which reduced the ability of the land to absorb rainfall. This increased 
                the risk of flooding and soil erosion."</i> The loss of forest cover could also 
                have long-term environmental consequences, such as reduced carbon sequestration 
                and decreased wildlife habitat.
              </p>
            </section>
            <section>
              <h4>Psychological and Health Impacts</h4>
              <p>
                Debbie Grable vividly remembers the terrifying ordeal of the Carlton Complex fire in 2014.
                She shared that the memory of the wildfire still sends shivers down her spine and
                continues to haunt her to this day. The fire, which ravaged large
                parts of the Methow Valley, was one of the most destructive wildfires
                in the history of the state, leaving a trail of destruction in its
                wake.
              </p>
              <p>
                For her, the experience of living through the Carlton Complex fire was
                nothing short of harrowing. The fast-moving flames, strong winds, and
                dry conditions made for a volatile and unpredictable situation that
                left many residents feeling helpless and afraid. The fire also displaced many residents, 
                causing emotional and psychological trauma.
              </p>
              <p>
                Debbie Grable said people with pre-existing respiratory conditions
                such as asthma and chronic obstructive pulmonary disease were
                particularly vulnerable. <i>"Smoke and ash filled the air during the fire, resulting in a
                decline in air quality. The smoke and ash contained
                harmful chemicals, which can cause respiratory problems in humans and
                animals."</i> she said. Even after the fire was extinguished, the ash and debris from the
                fire continued to pose a threat to public health. Ash and debris 
                can contaminate water sources, affecting drinking water quality.
              </p>
            </section>
            <section>
              <h4>Economic and Community Impacts</h4>
              <p>
                The Grables highlighted that The Carlton
                Complex fire also caused significant economic losses to individuals,
                businesses, and the community. <i>"The destruction of homes and property resulted in millions of dollars
                in damages,"</i> Debbie Grable said. <i>"The economic impact of the fire was
                felt across various industries, including agriculture, forestry, and
                tourism."</i>
              </p>
              <p>
                In the aftermath of the fire, the Grables and fellow community
                members had to band together to pick up the pieces. Many residents 
                had to rebuild homes from scratch. George Grable remarked <i>"I have to say 
                that the Carlton Complex fire had a profound impact on
                the public's life, and the destruction of homes and property led to
                significant economic losses for individuals and the community."</i>
              </p>
            </section>
        </article>
      </div>
    </section>
  );
}
