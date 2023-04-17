import * as d3 from 'd3';
import { colors, uniqueArray } from "../../utils/global";

let colorScale, max, rScale;
let textColor = "#D8D8D8";

export function initLegendVis(chartId, fires) {

    // margin: {top: 0, right: 10, bottom: 20, left: 10},
    // barHeight: 50

    max = d3.max(fires, function(d) {return d.nDays; });
    const min = d3.min(fires, function(d) {return d.nDays; });

    rScale = d3.scaleSqrt()
        .domain([min, max])
        .range([1, 5]);

    const nDaysUni = uniqueArray(fires, "nDays").sort(function(a, b) {return a - b});

    colorScale = d3.scaleOrdinal()
        .domain(nDaysUni.concat([-1]))
        .range(colors.concat(["#473F41"]));

    d3.select(`#${chartId}`)
        .append("svg")
        // .attr("viewBox", `0 0 ${width} ${width}`)
        // .attr("preserveAspectRatio", "xMidYMid meet")
        // .classed("svg-content", true);

    createLegend(chartId);
}

// Create Legend
function createLegend(chartId) {

    let svg = d3.select(`#${chartId} svg`);

    let data = [{"days": 1, "color": -1, "text": "Contained"},
                {"days": 1, "color": 1, "text": "1"},
                {"days": 6, "color": 6, "text": "6"},
                {"days": 11, "color": 11, "text": "11"},
                {"days": 16, "color": 16, "text": "16"},
                {"days": 21, "color": 21, "text": "21"}]

    if (window.screen.width < 786) {

        const width = 350, height = 50;

        svg 
            .attr("width", width)
            .attr("height", height);

        svg.append("text")
            .attr("x", 5)
            .attr("y", 10)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("# of days burning");

        let shape = svg.append("g")
            .selectAll("circle")
                .data(data, d => d.text)
                .enter()
                .append("g")
            .attr("transform", (d, i) => `translate(${(i * 32) + 25}, ${30})`);
    
        shape.append("circle")
            .attr("r", d => rScale(d.days))
            .attr("fill", d => colorScale(d.color))
            .attr("stroke", textColor)
            .attr("stroke-width", .5)
            .attr("stroke-opacity", .3);
    
        shape.append("text")
            .attr("text-anchor", "middle")
            .attr("y", 20)
            .attr("fill", textColor)
            .attr("font-size", 10)
            .text(d => d.text);

        svg.append("text")
            .attr("x", 220)
            .attr("y", 10)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("shelter")

        svg.append("path")
            .attr("transform", d => "translate(" + [230, 30] + ")")
            .attr("d", d3.symbol().type(d3.symbolCross).size("100"))
            .attr("fill", "#EE2C25");

        svg.append("text")
            .attr("x", 280)
            .attr("y", 10)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("household");

        svg.append("circle")
            .attr("cx", 290)
            .attr("cy", 30)
            .attr("r", 6)
            .attr("fill", "#36479D")
            .attr("fill-opacity", .6)
            .attr("stroke", "#36479D")
            .attr("stroke-opacity", 1);

    } else {

        const width = 120, height = 300;

        svg 
            .attr("width", width)
            .attr("height", height);

        svg.append("text")
            .attr("x", 10)
            .attr("y", 10)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("# of days burning");

        svg.selectAll("legend-fire")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", 15)
                .attr("cy", (d, i) => 30 + i*20)
                .attr("r", d => rScale(d.days))
                .attr("fill", d => colorScale(d.color))
                .attr("stroke", textColor)
                .attr("stroke-width", 1)
                .attr("stroke-opacity", .3);

        svg.selectAll("legend-text")
            .data(data)
            .enter()
            .append("text")
                .attr("x", 30)
                .attr("y", (d, i) => 33 + i*20)
                .attr("font-size", 10)
                .attr("fill", textColor)
                .text(d => d.text);

        svg.append("text")
            .attr("x", 10)
            .attr("y", 165)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("shelter");

        svg.append("path")
            .attr("transform", d => "translate(" + [20, 185] + ")")
            .attr("d", d3.symbol().type(d3.symbolCross).size("100"))
            .attr("fill", "#EE2C25");

        svg.append("text")
            .attr("x", 10)
            .attr("y", 220)
            .attr("font-size", 13)
            .attr("fill", textColor)
            .text("household");

        svg.append("circle")
            .attr("cx", 20)
            .attr("cy", 240)
            .attr("r", 6)
            .attr("fill", "#36479D")
            .attr("fill-opacity", .6)
            .attr("stroke", "#36479D")
            .attr("stroke-opacity", 1);
    }
}
