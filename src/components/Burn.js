import * as d3 from 'd3';

let xScaleBurn, yScaleBurn;

export function initBurnVis(chartId, complex) {

    // const margin = {top: 0, right: 10, bottom: 50, left: 10}
    const barHeight = 50;
    const width = 400;
    const min = d3.min(complex, function(d) {return d.size;});
    const max = d3.max(complex, function(d) {return d.size});

    xScaleBurn = d3.scaleSqrt()
        .domain([min, max])
        .range([0, width]);

    yScaleBurn = d3.scaleSqrt()
        .domain([min, max])
        .range([width, 0]);

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", width)
        // .attr("viewBox", `0 0 ${width} ${width}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    svg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width", xScaleBurn(min))
        .attr("height", yScaleBurn(max))
        .attr("fill", "#FFFFFF")
}

// Draw burnt area
export function drawBurnVis(chartId, data) {

    let bar = d3.select(`#${chartId} svg`)
        .selectAll("rect")
            .data(data)
            .enter()
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "burn")
            .attr("width", function(d) {return xScale(d.size)} )
            .attr("height",  function(d) {return xScale(d.size)})
            .attr("fill", "#473F41");

    let b = svg.selectAll(".burn")
            .data(data, function(d) { return d.date; });

    b.transition()
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width",  function(d) {return xScale(d.size)})
        .attr("height",  function(d) {return xScale(d.size)})
        .attr("fill", "#473F41");
}
