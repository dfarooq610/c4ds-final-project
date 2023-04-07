import * as d3 from 'd3';

let xScale, yScale;

export function initBurnVis(chartId, complex) {

    const margin = {top: 10, right: 10, bottom: 50, left: 10}
    const width = 650;
    const height = 175;

    xScale = d3.scaleSqrt()
        .domain(d3.extent(complex, function(d) {return d.date}))
        .range([margin.left, width - margin.right]);

    yScale = d3.scaleSqrt()
        .domain(d3.extent(complex, function(d) {return d.size}))
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
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

    const yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));
}

// Draw burnt area
export function drawBurnVis(chartId) {

    let data = complex.filter(d => d.story !== "" && d.date === date);

    d3.select(`#${chartId} svg`)

    const line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.size); })
        .curve(d3.curveLinear);

    // let bar = d3.select(`#${chartId} svg`)
    //     .selectAll("rect")
    //         .data(data)
    //         .enter()
    //         .attr("x", 0)
    //         .attr("y", 0)
    //         .attr("class", "burn")
    //         .attr("width", function(d) {return xScale(d.size)} )
    //         .attr("height",  function(d) {return xScale(d.size)})
    //         .attr("fill", "#473F41");

    // let b = svg.selectAll(".burn")
    //         .data(data, function(d) { return d.date; });

    // b.transition()
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("class", "burn")
    //     .attr("width",  function(d) {return xScale(d.size)})
    //     .attr("height",  function(d) {return xScale(d.size)})
    //     .attr("fill", "#473F41");
}
