import * as d3 from 'd3';
import stateBoundaries from "../data/state_boundaries.json";
import countyBoundaries from "../data/counties_geo.json";
import cityBoundaries from "../data/city_poly.json";
import countyBigStreets from "../data/county_bigstreets_reg.json";
import countyMedStreets from "../data/county_medstreets_reg.json";
import shelters from "../data/shelters.json";
import routes from "../data/route_sim2.json";
import fires from "../data/fire_points2.json";
import { colorScale, rScale, uniqueArray } from "../utils/global";
import fireBoundary from "../data/fire_boundary.json";

let projection;
let routesInitial = routes.features.filter((d) => d.properties.type === "initial");

// let userZoom = function(event) {
//     g
//     .attr("transform", `scale(${event.transform.k}) translate(${event.transform.x}, ${event.transform.y})`);
// }


colorScale.domain(uniqueArray(fires, "nDays").sort(function(a, b) {return a - b}))
rScale.domain(d3.extent(fires, function(d) {return d.nDays; }))

// Draw Basemap
export function drawBasemap(chartId, data, className, stroke = "#FFFFFF", strokeWidth = 1, fill = "#E0E0E0", fillOpacity=1) {

    let geoPathGenerator = d3.geoPath().projection(projection);

    let path = d3.select(`#${chartId} svg`)
        .append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", className)
        .attr("d", geoPathGenerator)
        .attr("stroke",stroke)
        .attr("stroke-width", strokeWidth)
        .attr("fill", fill)
        .attr("fill-opacity", fillOpacity);

    return path;
}

// Draw path
export function drawPath(chartId, data, className, stroke = "#D7D7D7", strokeWidth = 1, strokeOpacity = .5, fill ="none", fillOpacity) {

    let geoPathGenerator = d3.geoPath().projection(projection);

    let path = d3.select(`#${chartId} svg`)
        .append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("class", className)
        .attr("d", geoPathGenerator)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .attr("fill-opacity", fillOpacity)
        .attr("fill", fill);

    return path;
}

// https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
function getNonZeroRandomNumber(min, max) {
    var random = Math.floor(Math.random()*min) - max;
    if(random==0) return getNonZeroRandomNumber();
    return random;
}

// Updates the households
//Adapted from http://bl.ocks.org/JMStewart/6455921
export function updateHouses(chartId, date) {

    let data = routes.features.filter((d) => d.properties.evacDate === date);

    d3.select(`#${chartId} svg`)
        .selectAll(".house-points")
        .data(data, d => d.properties.id)
        .join(
            enter => enter
                .append("circle")
                .attr("class", "household")
                .attr("cx", function(d) {return projection([d.properties.x, d.properties.y])[0];})
                .attr("cy", function(d) {return projection([d.properties.x, d.properties.y])[1];})
                .attr("r", 1)
                .attr("fill", "#36479D")
                .attr("fill-opacity", .5)
                .attr("stroke", "#36479D")
                .attr("stroke-opacity", 1),
            update => update
                .transition()
                .delay(function(d, i) {return 10*getNonZeroRandomNumber(399, 299)})
                .duration(1000)
                .tween("pathTween", function(d, i) {
                    return pathTween(drawPath(chartId, [d], "escape-route"))
                })
    );

    function pathTween(path) {
        var length = path.node().getTotalLength(); // Get the length of the path
        var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
        return function(t){
            var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
            d3.select(this) // Select the circle
                .attr("cx", point.x) // Set the cx
                .attr("cy", point.y) // Set the cy
        }
    }
}

// Update shelter points
export function updateShelter(chartId, date) {

    let data = shelters.filter((d) => date >= d.openDate && date <= d.closeDate);

    // console.log(data)

    d3.select(`#${chartId} svg`)
        .selectAll(".shelter-points")
        .data(data, d => d.id)
        .join(
            enter => enter
                .append("path")
                   .attr("transform", d => "translate(" + [
                        projection([d.long, d.lat])[0],
                        projection([d.long, d.lat])[1]] + ")")
                    .attr("d", d3.symbol().type(d3.symbolCross).size(100))
                    .transition()
                    .duration(1000)
                    .attr("fill", "#EE2C25")
                    .style('opacity', 1),
                update => update
                    .attr("transform", d => "translate(" + [
                        projection([d.long, d.lat])[0],
                        projection([d.long, d.lat])[1]] + ")"),
                exit => exit
                    .transition()
                    .duration(1000)
                    .attr("d", d3.symbol().size(0))
                    .style("opacity", 0)
                    .remove()
    );
}

function fireBurnNDays(date, d) {
    let month = "0"+ date.toString().substr(0, 1);
    let day = date.toString().substr(1, 3);
    let newDate = new Date(`2014-${month}-${day}`);
    let oldDate = new Date(d.startDay);
    const diffTime = Math.abs(newDate - oldDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays;
}

// Update fire points
export function updateFire(chartId, date) {

    const data = fires.filter((d) => date >= d.startDate);

    d3.select(`#${chartId} svg`)
        .selectAll(".fire-points")
        .data(data, d => d.id)
        .join(
            enter  => enter
            .append("circle")
                .attr("cx", function(d) {return projection([d.LonRand, d.LatRand])[0];})
                .attr("cy", function(d) {return projection([d.LonRand, d.LatRand])[1];})
                .attr("r", function(d) {
                    if (date >= d.endDate) {
                        return .5;
                    } else {
                        return rScale(fireBurnNDays(date, d));
                    }
                })
                .attr("fill", function(d) { 
                    if (date >= d.endDate) {
                        return "#473F41";
                    } else {
                        return colorScale(fireBurnNDays(date, d));
                    }
                })
                .attr("stroke", function(d) {
                    if (date >= d.endDate) {
                        return "#473F41";
                    } else {
                        return colorScale(fireBurnNDays(date, d));
                    }
                })
                .attr("fill-opacity", function(d) {
                    if (date >= d.endDate) {
                        return .3;
                    } else {
                        return 1;
                    }
                }),
            update => update,
            exit => exit.remove()
    );
}

export function initMapVis(chartId) {

    const width = 650, height = 450, initialScale = 25000,
        initialCenterX = -24,
        initialCenterY = 48.25;

    d3.select(`#${chartId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            // .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("preserveAspectRatio", "xMidYMid meet")
            // .classed("svg-content", true);

    projection = d3.geoAlbers()
            .translate([width / 2, height / 2])
            .scale(initialScale)
            .center([initialCenterX, initialCenterY]);

    // Draw Polygons
    drawBasemap(chartId, stateBoundaries, "state");
    drawBasemap(chartId, countyBoundaries, "county");
    drawBasemap(chartId, cityBoundaries, "city", "#141225", .5, "#141225", .5);

    // Draw paths
    drawPath(chartId, countyBigStreets.features, "big-streets", "#000000", 1.5);
    drawPath(chartId, countyMedStreets.features, "med-streets", "#000000", 1);

    // var zoom = d3.zoom()
    // .scaleExtent([0, 15])
    // .on("zoom", userZoom);

    // svgMap.call(zoom);
}

export function updateMapVis(chartId, date) {

    // let complexFiltered = complex.filter(d => d.story !== "");
    // let dataUpdate = complexFiltered.filter((d) => d.date === date);

    // Burn.draw(svgBurn, paramsBurn, xScaleBurn, yScaleBurn, dataUpdate);
    // Containment.draw(svgContainment, paramsContainment, xScaleContainment, dataUpdate);

    updateHouses(chartId, date);
    updateShelter(chartId, date);
    updateFire(chartId, date);

    if (date === 826) {
        drawPath(chartId, fireBoundary.features, "fire-boundary", "#473F41", .5, 1, "#473F41", .5);
    }
}
