req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  var dataset = json['data'];
  return dataset[0];
}

d3.select('body').append('h1')
  .text('United States GDP')
  .attr("id", "title");

d3.select('body').append('p').text(dataset[0]);

/* 
const w = 1000;
const h = 500;
const padding = 60;

const xScale = d3.scaleLinear()
  .domain([d3.min(dataset, (d) => d[0]),              d3.max(dataset, (d) => d[0])])
  .range([padding, x - padding]);
const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([h-padding, padding]);
const svg = d3.select("body").append('svg')
  .attr('width', w).attr('height', h);

svg.selectAll("rect")
.data(dataset)
.enter().append("rect")
.attr("x", (d, i) => i * 30)
.attr("y", (d, i) => h - 3 * d)

*/



