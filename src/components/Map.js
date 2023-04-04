import * as d3 from 'd3';
import stateBoundaries from "../data/state_boundaries.json";
import countyBoundaries from "../data/counties_geo.json";
import cityBoundaries from "../data/city_poly.json";
import countyBigStreets from "../data/county_bigstreets_reg.json";
import countyMedStreets from "../data/county_medstreets_reg.json";
import shelters from "../data/shelters.json";
import routes from "../data/route_sim2.json";
import fires from "../data/fire_points2.json";
import complex from "../data/complex_data.json";

let projection;
let routesInitial = routes.features.filter((d) => d.properties.type === "initial");

// let userZoom = function(event) {
//     g
//     .attr("transform", `scale(${event.transform.k}) translate(${event.transform.x}, ${event.transform.y})`);
// }


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

// Create households
export function initHouses(chartId, data, className = "household") {

    // console.log(data)
    // let points = g
    // .append("g")

    let points = d3.select(`#${chartId} svg`)
                .append("g")

    points
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", className)
            .attr("cx", function(d) {return projection([d.properties.x, d.properties.y])[0];})
            .attr("cy", function(d) {return projection([d.properties.x, d.properties.y])[1];})
            .attr("r", 1)
            .attr("fill", "#36479D")
            .attr("fill-opacity", .5)
            .attr("stroke", "#36479D")
            .attr("stroke-opacity", 1);

    // let tw = g.node().clientWidth;
    // let th = g.node().clientHeight;
    // let sx = tw / paramsMap.width;
    // let sy = th / paramsMap.height;

    // let tooltip = d3.select(`#tooltip`)
    //     .append("div")
    //     .attr("class", "tooltip");
    
    // points.on("mouseover", function(e, d) {

    //     console.log(d)
    //     let x = sx*(+d3.select(this).attr("cx")) + 20;
    //     let y = sy*(+d3.select(this).attr("cy")) - 10;

    //     tooltip.style("visibility", "visible")
    //         .style("top", `${y}px`)
    //         .style("left", `${x}px`)
    //         // .html(`${d.properties.place}`);

    // }).on("mouseout", function() {
    //     tooltip.style("visibility", "hidden");
    // });

    return points;
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
    console.log(chartId, date)

    let data = routes.features.filter((d) => d.properties.evacDate === date);

    console.log(data)
    let g = d3.selectAll(`#${chartId} g .household`);
    console.log(g)


    // // console.log(g)
        let c = g
            .data(data, function(d) {return d.properties.id;});

    c
    .enter()
    .append("circle")
    .merge(c)
        .transition()
        .delay(function(d, i) {return 10*getNonZeroRandomNumber(399, 299)})
        .duration(1000)
        .tween("pathTween", function(d, i) {
            return pathTween(drawPath(chartId, [d], "escape-route"))
        });

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

// Create initial shelter points
// Shelter points are initially not visible
export function initShelter(chartId, shelters) {

    // let points = g
    //     .append("g")

    let points = d3.select(`#${chartId} svg`)
                .append("g")
                .attr("class", "shelters")

    points
        .selectAll("path")
        .data(shelters)
        .enter()
        .append("path")
            .attr("class", "shelter")
            .attr("transform", d => "translate(" + [
                projection([d.long, d.lat])[0],
                projection([d.long, d.lat])[1]] + ")")
            .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)

    // points
    //     .selectAll("circle")
    //     .data(shelters)
    //     .enter()
    //     .append("circle")
    //         .attr("class", "shelters")
    //         .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
    //         .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
    //         .attr("r", 8)
    //         .attr("fill", "#FFFFFF")
    //         .attr("stroke", "#FFFFFF")
    //         .attr("stroke-weight", 2)
    //         .attr("fill-opacity", 0)
    //         .attr("stroke-opacity", 0);
}

// Update shelter points
export function updateShelter(chartId, date, fill, r, opacity) {

    let data = shelters.filter((d) => date >= d.openDate && date <= d.closeDate);

    console.log(data)

    let svg = d3.selectAll(`#${chartId} svg`);

    let node = svg
    .select(".shelters")

    console.log(node)

    node
    .selectAll("symbol")
        .data(data, d => d.id)
        .join(
            enter  => enter
                .append("path")
                    .attr("transform", d => "translate(" + [
                        projection([d.long, d.lat])[0],
                        projection([d.long, d.lat])[1]] + ")")
                    .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
                    .attr("fill", fill)
                    .attr("opacity", opacity),
            update => update
                // .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
                // .attr("fill", fill)
                .attr("opacity", opacity),
            exit => exit
                .transition()
                .attr("r", 0)
                .attr("opacity", 0)
                .duration(1000)
                .remove()
        )

    // svg.append("g").attr("class", "nodes");
    //     .data(data, function(d) {return d.id;});

    //     c
    //     .enter()
    //     .append("circle")
    //         .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
    //         .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
    //         .attr("stroke", "#FFFFFF")
    //         .attr("fill", "#FFFFFF")
    //         .attr("r", r)
    //         .attr("stroke-opacity", opacity)
    //         .attr("fill-opacity", .2)
    //     .merge(c)
    //         .transition()
    //         .duration(1000)

    // c.exit()
    //     .transition()
    //     .attr("r", 0)
    //     .attr("opacity", 0)
    //     .duration(1000)
    //     .remove();

    // let s = d3.selectAll(`#${chartId} .shelters`)
    //     .selectAll("path")
    //     .data(data, function(d) {return d.id;});

    // s
    // .enter()
    // .append("path")
    //     .attr("transform", d => "translate(" + [
    //     projection([d.long, d.lat])[0],
    //     projection([d.long, d.lat])[1]] + ")")
    //     .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
    //     .attr("fill", fill)
    //     .attr("opacity", opacity)
    // .merge(s)
    //     .transition()
    //     .duration(1000)

    // s.exit()
    //     .transition()
    //     .attr("opacity", 0)
    //     .duration(1000)
    //     .remove();
}


// Create initial fire points
export function initFire(chartId, fires) {

    // let points = g
    //         .append("g")

    let points = d3.select(`#${chartId} svg`)
                .append("g")

    points
        .selectAll("circle")
        .data(fires)
        .enter()
        .append("circle")
        .attr("class", "fire-point")

    return points;
}

function fireBurnNDays(date, d) {

    let month = "0"+ date.toString().substr(0, 1);
    let day = date.toString().substr(1, 3);
    let newDate = new Date(`2014-${month}-${day}`)
    var diff = new Date(newDate.getTime() - d.startDay.getTime());

    return diff.getUTCDate() - 1;
}

// Update fire points
export function updateFire(g, projection, date, colorScale, rScale) {

    const data = fires.filter((d) => date >= d.startDate);

    let c = d3.selectAll(`#${chartId} .fire-point`)
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
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
            })
            .attr("stroke-opacity", 1)
            .attr("stroke-width", .5)
        .merge(c)
            .transition()
            .duration(500)
            .ease(d3.easeCircleIn)

    c.exit()
    .transition()
    .duration(3000)
    .ease(d3.easeCircleOut)
    .attr("r", .5)
    .remove();
}

export function initMapVis(chartId) {

    const width = 650, height = 500, initialScale = 25000,
        initialCenterX = -24,
        initialCenterY = 48.25;

    let svg = d3.select(`#${chartId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            // .attr("viewBox", `0 0 ${width} ${height}`)
            // .attr("preserveAspectRatio", "xMidYMid meet")
            // .classed("svg-content", true);

    // let g = svg.append("g");

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

    // Draw Points
    initShelter(chartId, shelters);
    initFire(chartId, fires);
    initHouses(chartId, routesInitial, "household");

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
    // Timer.draw(svgTimeline, paramsTimeline, xScaleTimeline, dataUpdate);

    // updateHouses(chartId, date);
    updateShelter(chartId, date, "#EE2C25", 8, 1);
    // updateFire(projection, date, colorScale, rScale);

    // if (date === 826) {
    //     drawPath(g, projection, fireBoundary.features, "fire-boundary", "#473F41", .5, 1, "#473F41", .5);
    // }
}
