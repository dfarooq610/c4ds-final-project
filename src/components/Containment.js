import * as d3 from 'd3';

let xScale, barHeight, margin;

export function initContainmentVis(chartId) {

    margin = {top: 0, right: 10, bottom: 20, left: 10};
    const min = 0, max = 100;
    const width = 400, height = 100;

    barHeight = 50;

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", `0 0 ${width} ${height}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    xScale= d3.scaleLinear()
        .domain([min, max])
        .range([margin.left, width - margin.right]);

    svg
        .append("rect")
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", xScale(min))
        .attr("height", barHeight)
        .attr("fill", "#FFFFFF")

    let xAxisContainment = svg
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).ticks(2));
}


// Draw containment percentage
export function drawContainmentVis(chartId, data) {

    let bar = d3.select(`#${chartId} svg`)
        .selectAll("rect")
        .data(data)
        .enter()
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", function(d) {return xScale(d.containment)} )
        .attr("height", barHeight)
        .attr("fill", "#473F41");

    let b = svg.selectAll(".containment")
            .data(data, function(d) { return d.date; });

    b.transition()
        .ease(d3.easeLinear)
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", function(d) {return xScale(d.containment)} )
        .attr("height", barHeight)
        .attr("fill", "#473F41");
}
