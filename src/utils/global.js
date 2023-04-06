import * as d3 from 'd3';

//https://gka.github.io/palettes/#/22|s|ffcc55,f68c1f,ea2c24|ffffe0,ff005e,93003a|1|1
export const colors = ['#ffcc55', '#ffc751', '#fec24d', '#febd4a', '#fdb846', '#fdb343', '#fcae3f',
    '#fba93c', '#fba33a', '#fa9e37', '#f99934', '#f99432', '#f88e30', '#f7892e', 
    '#f6832c', '#f57d2b', '#f47829', '#f47228', '#f36c27', '#f26526', '#f15f25', 
    '#f05825', '#ee5124', '#ed4924', '#ec4124', '#eb3724', '#ea2c24'];

// Title Unique Array
// Returns the unique values of a variable in a dataset as an array
export function uniqueArray(data, variable) {
    let all = data.map(function (d) {
        return d[variable];
    });

    return [...new Set(all)];
}

export let colorScale = d3.scaleOrdinal()
    .range(colors);

export let rScale = d3.scaleSqrt()
    .range([1, 5]);
