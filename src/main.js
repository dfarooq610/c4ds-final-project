import * as Helper from './modules/helper_functions.js';
import * as Timer from './modules/timer.js'
import * as Map from './modules/map.js';
import * as Containment from "./modules/containment.js";
import * as Story from "./modules/storyline.js";
import * as Burn from "./modules/burn.js"

// Timeline
const paramsTimeline = {
    selector: "timeline",
    margin: {top: 0, right: 10, bottom: 50, left: 10},
    width: 1000,
    height: 100,
    barHeight: 50
}

const svgTimeline = d3.select(`#${paramsTimeline.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsTimeline.width} ${paramsTimeline.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .classed("svg-content", true);

// Burn
const paramsBurn = {
    selector: "burn",
    margin: 0,
    width: 400
}

const svgBurn = d3.select(`#${paramsBurn.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsBurn.width} ${paramsBurn.width}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .classed("svg-content", true);

// Containment
const paramsContainment = {
    selector: "containment",
    margin: {top: 0, right: 10, bottom: 20, left: 10},
    width: 400,
    height: 100,
    barHeight: 50,
    min: 0,
    max: 100
}

const svgContainment = d3.select(`#${paramsContainment.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsContainment.width} ${paramsContainment.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .classed("svg-content", true);

// Story
const paramsStory = {
    selector: "story"
}

// Legend
const paramsLegend = {
    selector: "legend",
    margin: {top: 0, right: 10, bottom: 20, left: 10},
    width: 200,
    height: 200,
}

const svgLegend = d3.select(`#${paramsLegend.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsLegend.width} ${paramsLegend.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .classed("svg-content", true);

//Map
const paramsMap = {
    selector: "chart",
    width: 500,
    height: 300,
    margin: {top: 0, right: 10, bottom: 50, left: 10},
    initialScale: 20000,
    initialCenterX: -24,
    initialCenterY: 48.25
}

const svgMap = d3.select(`#${paramsMap.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsMap.width} ${paramsMap.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .classed("svg-content", true);

let g = svgMap.append("g");

let projection = d3.geoAlbers()
    .translate([paramsMap.width / 2, paramsMap.height / 2])
    .scale(paramsMap.initialScale)
    .center([paramsMap.initialCenterX, paramsMap.initialCenterY]);

// Helper.collapsibleTable();

function drawVis(stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, data, shelters, fires, fireBoundary, cityBoundaries, routes) {

    // console.log(stateBoundaries);
    // console.log(countyBoundaries);
    // console.log(okBigStreets)
    // console.log(okMedStreets)
    // console.log(shelters)
    // console.log(fires)
    // console.log(fireBoundary)
    // console.log(cityBoundaries)
    // console.log(routes)

    let start = d3.min(data, function(d) {return +d.i});
    let limit = d3.max(data, function(d) {return +d.i});
    let i = start;

    let params = {
        dates: data, 
        limit: limit,
        i: i,
        speed: 1000
    }

    // Timeline
    paramsTimeline["min"] = d3.min(data, function(d) {return d.date; });
    paramsTimeline["max"] = d3.max(data, function(d) {return d.date; });
    paramsTimeline["speed"] = params.speed

    let days = Helper.uniqueArray(data, "date").sort(function(a, b) {return a - b});
    let days2 = Timer.daysLabel(days, data);
    let xWidth = (paramsTimeline.width - paramsTimeline.margin.left - paramsTimeline.margin.right)/days.length;

    const july = svgTimeline.append("text")
        .attr("class","axis--label")
        .attr("x", paramsTimeline.margin.left + xWidth*17/2)
        .attr("y", paramsTimeline.height-paramsTimeline.margin.bottom/4)
        .text("July");

    const august = svgTimeline.append("text")
        .attr("class","axis--label")
        .attr("x", paramsTimeline.margin.left + xWidth*17 + xWidth*27/2)
        .attr("y", paramsTimeline.height-paramsTimeline.margin.bottom/4)
        .text("August");

    let xScaleTimeline = d3.scaleBand()
        .domain(days)
        .range([paramsTimeline.margin.left, paramsTimeline.width - paramsTimeline.margin.right])
        .paddingInner(0.5)
        .paddingOuter(0.2);

    let xAxisTimeline = svgTimeline
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${paramsTimeline.height-paramsTimeline.margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleTimeline).tickValues(days).tickFormat((d, i) => days2[i]));

    svgTimeline
        .append("rect")
        .attr("x", xScaleTimeline(paramsTimeline.min))
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width", xScaleTimeline.bandwidth())
        .attr("height", paramsTimeline.barHeight)
        .attr("fill", "#473F41")

    // Burn
    paramsBurn["min"] = d3.min(data, function(d) {return d.size;});
    paramsBurn["max"] = d3.max(data, function(d) {return d.size});
    paramsBurn["speed"] = params.speed

    const xScaleBurn = d3.scaleSqrt()
        .domain([paramsBurn.min, paramsBurn.max])
        .range([paramsBurn.margin, paramsBurn.width - paramsBurn.margin]);

    const yScaleBurn = d3.scaleSqrt()
        .domain([paramsBurn.min, paramsBurn.max])
        .range([paramsBurn.width - paramsBurn.margin, paramsBurn.margin]);

    svgBurn
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width", xScaleBurn(paramsBurn.min))
        .attr("height", yScaleBurn(paramsBurn.max))
        .attr("fill", "#FFFFFF")

    // Containment
    paramsContainment["speed"] = params.speed

    let xScaleContainment = d3.scaleLinear()
        .domain([paramsContainment.min, paramsContainment.max])
        .range([paramsContainment.margin.left, paramsContainment.width - paramsContainment.margin.right]);

    svgContainment
        .append("rect")
        .attr("x", paramsContainment.margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", xScaleContainment(paramsContainment.min))
        .attr("height", paramsContainment.barHeight)
        .attr("fill", "#FFFFFF")

    let xAxisContainment = svgContainment
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${paramsContainment.height-paramsContainment.margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleContainment).ticks(2));

    //Legend
    paramsLegend["min"] = d3.min(fires, function(d) {return d.nDays; });
    paramsLegend["max"] = d3.max(fires, function(d) {return d.nDays; });
    paramsLegend["nDaysUni"] = Helper.uniqueArray(fires, "nDays").sort(function(a, b) {return a - b});

    //https://gka.github.io/palettes/#/22|s|ffcc55,f68c1f,ea2c24|ffffe0,ff005e,93003a|1|1
    const colors = ['#ffcc55', '#ffc751', '#fec24d', '#febd4a', '#fdb846', '#fdb343', '#fcae3f',
                    '#fba93c', '#fba33a', '#fa9e37', '#f99934', '#f99432', '#f88e30', '#f7892e', 
                    '#f6832c', '#f57d2b', '#f47829', '#f47228', '#f36c27', '#f26526', '#f15f25', 
                    '#f05825', '#ee5124', '#ed4924', '#ec4124', '#eb3724', '#ea2c24']

    const colorScale = d3.scaleOrdinal()
        .domain(paramsLegend.nDaysUni)
        .range(colors);

    const rScale = d3.scaleSqrt()
        .domain([paramsLegend.min, paramsLegend.max])
        .range([1, 5]);

    //Map
    Map.createLegend(svgLegend, rScale, colorScale, paramsLegend.max)
    Map.drawBasemap(g, projection, stateBoundaries, "state");
    Map.drawBasemap(g, projection, countyBoundaries, "county");
    Map.drawBasemap(g, projection, cityBoundaries, "city", "#141225", .5, "#141225", .5);
    Map.drawPath(g, projection, okBigStreets.features, "big-streets", "#000000", 1.5);
    Map.drawPath(g, projection, okMedStreets.features, "med-streets", "#000000", 1);

    let routesInitial = routes.features.filter((d) => d.properties.type === "initial");

    let shelterPoints = Map.createShelter(g, projection, shelters);
    let firePoints = Map.createFire(g, fires);
    let housePoints = Map.createHouses(g, projection, routesInitial, "households", paramsMap);

    let userZoom = function(event) {
        g
        .attr("transform", `scale(${event.transform.k}) translate(${event.transform.x}, ${event.transform.y})`);
    }

    var zoom = d3.zoom()
    .scaleExtent([0, 15])
    .on("zoom", userZoom)

    svgMap.call(zoom);


    console.log(params)
    

    // Timer
    Timer.setDate(params, function (date) {

        console.log(params)

        if (date === 715) {
        //     d3.select("svg")
        //     .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale)
        //     .call(zoom.on('zoom', (event) => {
        //         svg.attr('transform', event.transform);
        //      })))
        }

        date = parseInt(date);
        let dataUpdate = data.filter((d) => d.date === date);
        let firesUpdate = fires.filter((d) => date >= d.startDate);

        let sheltersUpdate = shelters.filter((d) => date >= d.openDate && date <= d.closeDate);
        let housesUpdate = routes.features.filter((d) => d.properties.evacDate === date);

        Burn.draw(svgBurn, paramsBurn, xScaleBurn, yScaleBurn, dataUpdate);
        Containment.draw(svgContainment, paramsContainment, xScaleContainment, dataUpdate);
        Story.update(paramsStory.selector, dataUpdate);
        Story.powerout(date);
        Timer.draw(svgTimeline, paramsTimeline, xScaleTimeline, dataUpdate);

        Map.updateHouses(housePoints, projection, housesUpdate, params.speed);
        Map.updateShelter(shelterPoints, projection, sheltersUpdate, "#EE2C25", 8, 1);
        Map.updateFire(firePoints, projection, firesUpdate, date, colorScale, rScale);

        if (date === 731) {
            params.speed = 1500;
        }

        if (date === 805) {
            params.speed = 500;
        }

        if (date === 826) {
            Map.drawPath(g, projection, fireBoundary.features, "fire-boundary", "#473F41", .5, 1, "#473F41", .5);
        }
    });
}
