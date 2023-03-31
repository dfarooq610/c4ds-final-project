import * as d3 from 'd3';
import { colors, uniqueArray } from "../utils/global";

let colorScale, maxDays, max, rScale;
const legendVis = "Burn-Vis";

export function initLegendVis(chartId, fires) {

    // margin: {top: 0, right: 10, bottom: 20, left: 10},
    // barHeight: 50

    const width = 200, height = 200;

    max = d3.max(fires, function(d) {return d.nDays; });
    const min = d3.min(fires, function(d) {return d.nDays; });

    rScale = d3.scaleSqrt()
    .domain([min, max])
    .range([1, 5]);

    const nDaysUni = uniqueArray(fires, "nDays").sort(function(a, b) {return a - b});

    colorScale = d3.scaleOrdinal()
        .domain(nDaysUni)
        .range(colors);

    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${width}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    createLegend(chartId);
}

// Create Legend
function createLegend(chartId) {

    let svg = d3.select(`#${chartId} svg`)

    svg.append("text")
        .attr("x", 10)
        .attr("y", 10)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("# of days burning")

    for (var j = 1; j < maxDays; j= j + 5) {
        svg.append("circle")
            .attr("cx", 15)
            .attr("cy", 20 + j*4)
            .attr("r", rScale(j))
            .attr("fill", colorScale(j));

        svg.append("text")
            .attr("x", 30)
            .attr("y", 20 + j*4 + 4)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("color", "#473F41")
            .text(j)
    }

    svg.append("text")
        .attr("x", 100)
        .attr("y", 10)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("contained fire")

    svg.append("circle")
        .attr("cx", 105)
        .attr("cy", 20)
        .attr("r", rScale(2))
        .attr("fill", "#473F41")
        .attr("stroke", "#473F41")
        .attr("stroke-width", .5)
        .attr("fill-opacity", .3);

    svg.append("text")
        .attr("x", 100)
        .attr("y", 40)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("shelter")

    svg.append("circle")
        .attr("cx", 110)
        .attr("cy", 55)
        .attr("r", 8)
        .attr("fill", "#D7D7D7")
        .attr("stroke", "#D7D7D7")
        .attr("stroke-width", 2)
        .attr("fill-opacity", .2);

    svg.append("path")
        .attr("transform", d => "translate(" + [110, 55] + ")")
        .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
        .attr("fill", "#EE2C25");

    svg.append("text")
        .attr("x", 100)
        .attr("y", 80)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("household");

    svg.append("circle")
        .attr("cx", 105)
        .attr("cy", 88)
        .attr("r", 2)
        .attr("fill", "#36479D")
        .attr("fill-opacity", .6)
        .attr("stroke", "#36479D")
        .attr("stroke-opacity", 1);

}
