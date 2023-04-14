import * as d3 from 'd3';
import complex from "../../data/complex_data.json";
import { uniqueArray } from "../../utils/global";

let xScale, yScale, area, height, margin;

// Create days label
// Description an array for each date 
// Return array
export function daysLabel(days, dates) {
    let days2 = [];
    days.forEach(function(d) {

        let x = dates.filter(function(j) {
            return j.date__1 === d;
        });
        days2.push(x[0].day);
    });

    return days2;
}

export function initBurnVis(chartId, complex) {

    margin = {top: 10, right: 0, bottom: 70, left: 100}
    const width = 650;
    height = 250;
    const days = uniqueArray(complex, "date__1").sort(function(a, b) {return a - b});
    const days2 = daysLabel(days, complex);

    xScale = d3.scaleBand()
        .domain(days)
        .range([margin.left, width - margin.right]);

    yScale = d3.scaleLinear()
        .domain(d3.extent(complex, function(d) {return d.size/1000}))
        .range([height - margin.bottom, margin.top]);

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${width}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    const xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickValues(days).tickFormat((d, i) => days2[i]));

    const yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    svg.append("text")
        .attr("class","axisLabel")
        .attr("x", (width - margin.left - margin.right)/2 + margin.left)
        .attr("y", height - 20)
        .attr("text-anchor","middle")
        .text("Date")
        .attr("fill", "#cbcbcb")
        .attr("font-size", 14)
        // .attr("font-weight", "bold");

    svg.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/2)
        .attr("y", 60)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .text("Acres (in thousands)")
        .attr("fill", "#cbcbcb")
        .attr("font-size", 14)
        // .attr("font-weight", "bold");

    const xWidth = (width - margin.left - margin.right)/days.length;

    const july = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17/2)
        .attr("y", height-33)
        .attr("font-size", 13)
        .text("July");

    const august = svg.append("text")
        .attr("class","axis--label")
        .attr("x", margin.left + xWidth*17 + xWidth*27/2)
        .attr("y", height-33)
        .attr("font-size", 13)
        .text("August");
}

// Draw burnt area
export function updateBurnVis(chartId) {

    // let data = complex.filter(d => d.story !== "" && d.date === date);
    let data = complex;
    let svg = d3.select(`#${chartId} svg`);

    console.log(data)

    area = d3.area()
        .x(function(d) { return xScale(d.date__1); })
        .y1(function(d) { return yScale(d.size); })
        .y0(height-margin.bottom)
        .curve(d3.curveLinear);

    let path = svg.append("path")
        .datum(data)
          .attr("d", function(d) { return area(d); })
          .attr("stroke","none")
          .attr("fill", "lightgray");
}
