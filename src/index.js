import * as Daily from './daily.json'
import * as d3 from 'd3'
import _ from 'lodash'
const Data = Object.values(Daily);

function initLineGraph(selector){

   const defaultMargin = 50;
   const margin = {top: defaultMargin, right: defaultMargin,
       bottom: defaultMargin, left: defaultMargin};
   const width = 1200 - margin.left - margin.right;
   const height = 480 - margin.top - margin.bottom;

    const dataset = Data.map((dataEntry) => {
        return {
            x: d3.timeParse("%Y%m%d")(dataEntry.date),
            y: dataEntry.death ? dataEntry.death : 0
        }
    })
        .filter((dataEntry) => {
            return dataEntry.y != null
        })
        .reverse();

    const yScale = d3.scaleLinear()
        .domain([0, _.maxBy(dataset, x=>x.y).y])
        .range([height, 0]);

    const xScale = d3.scaleTime()
        .domain([
            _.minBy(dataset, dataEntry=>dataEntry.x).x,
            _.maxBy(dataset, dataEntry=>dataEntry.x).x])
        .range([0, width]);

    const line = d3.line()
        .x((p)=>{return xScale(p.x)})
        .y((p)=>{return yScale(p.y)})
        .curve(d3.curveMonotoneX);

    const svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));
    svg.append("path")
        .datum(dataset)
        .attr("class", 'line')
        .attr('d', line);

}
function initContainers() {
    initLineGraph("#line-graph");
}

document.addEventListener('DOMContentLoaded', function (){
  initContainers();
});
