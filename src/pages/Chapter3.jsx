import React from "react";
import ReactDOM from "react-dom";
import Flickity from "react-flickity-component";

function Carousel() {
  return (
    <Flickity>
        <figure>
            <img src="./assets/Carlton Complex 2014.jpg" />
            <p>Carlton Complex Fire behind a ridge, 2014. Photo by Danny Yanarella.</p>
        </figure>
        <figure>
            <img src="https://placeimg.com/640/480/nature" />
        </figure>
        <figure>
            <img src="https://placeimg.com/640/480/architecture" />
        </figure>
    </Flickity>
  );
}

export default function Chapter3() {

    return (
        <section id="Chapter3" className="ChapterContainer DarkMode">
          <div className="ChapterContainer3">
            <h2>Response</h2>
            <h3 className="Chapter3Subtitle">
              Preparing for future threats
            </h3>
            <Carousel />
          </div>
        </section>
      );

//   return (
//     <div className="Chapter3">
//       <h1>Here are things you can do to keep safe:</h1>
//       <div className="carousel">
//         <p>
//           1. Stay informed about the latest updates and warnings from local
//           authorities, and be prepared to evacuate if necessary.
//         </p>
//         <p>
//           2. Create a defensible space around your home by removing any
//           flammable materials, such as dry leaves or brush, and trimming back
//           trees and shrubs.
//         </p>
//         <p>
//           3. Keep a supply of emergency essentials, such as water, food,
//           first-aid supplies, and a battery-powered radio, in case you need to
//           evacuate quickly.
//         </p>
//         <p>
//           4. Make sure your home is properly equipped with smoke detectors and
//           fire extinguishers, and that you know how to use them.
//         </p>
//         <p>
//           5. Plan your escape routes in advance, and practice evacuating with
//           your family so everyone knows what to do in case of an emergency.
//         </p>
//         <p>
//           6. If you are trapped in a wildfire, seek shelter in a cleared area,
//           such as a road or a clearing, and cover yourself with a wet blanket or
//           towel to protect yourself from the heat and flames.
//         </p>
//         <p>
//           7. Avoid driving through areas affected by wildfires, as smoke and
//           poor visibility can make driving dangerous.
//         </p>
//         <p>
//           8. If you have pets, make sure they are properly identified and that
//           you have a plan for evacuating them as well.
//         </p>
//         <p>
//           9. Be mindful of fire danger when camping or using outdoor equipment,
//           and make sure fires are properly extinguished before leaving the area.
//         </p>
//         <p>
//           10. Be aware of the risks of post-wildfire hazards, such as mudslides
//           and flash floods, and take precautions to stay safe in the aftermath
//           of a fire.
//         </p>
//       </div>
//     </div>

//     // First, we need to import the Flickity.js library
//     // Then, we can create a container element for our paragraphs

//     // Finally, we can initialize Flickity on our container element
//     // The above code will create a carousel of paragraphs using Flickity.js
//   );
}