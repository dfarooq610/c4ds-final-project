import * as d3 from 'd3';
import { uniqueArray } from "../utils/global";

let xScale;

// Create days label
// Description an array for each date 
// Return array
export function daysLabel(days, dates) {
    let days2 = []
    days.forEach(function(d) {

        let x = dates.filter(function(j) {
            return j.date === d;
        });
        days2.push(x[0].day)
    })

    return days2;
}

export function initTimelineVis(chartId, complex) {

    const width = 1000, height = 100;
    const margin = {top: 0, right: 10, bottom: 50, left: 10};

    const days = uniqueArray(complex, "date").sort(function(a, b) {return a - b});
    const days2 = daysLabel(days, complex);
    const xWidth = (width - margin.left - margin.right)/days.length;

    const min = d3.min(complex, function(d) {return d.date; });
    const max = d3.max(complex, function(d) {return d.date; });
    const barHeight = 50;

    xScale = d3.scaleBand()
        .domain(days)
        .range([margin.left, width - margin.right])
        .paddingInner(0.5)
        .paddingOuter(0.2);

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${height}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    const july = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17/2)
        .attr("y", height-margin.bottom/4)
        .text("July");

    const august = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17 + xWidth*27/2)
        .attr("y", height-margin.bottom/4)
        .text("August");

    const xAxisTimeline = svg
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickValues(days).tickFormat((d, i) => days2[i]));

    svg
        .append("rect")
        .attr("x", xScale(min))
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width", xScale.bandwidth())
        .attr("height", barHeight)
        .attr("fill", "#FFFFFF")
}
