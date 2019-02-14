d3.select('body').append('h1')
  .text('United States GDP')
  .attr("id", "title");

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(json){
  
  const dataset = json.data; // ["1947-01-01", 243.1]
  const w = 800;
  const h = 500;
  const padding = 60;
  const rectWid = (w - padding)/dataset.length;

  const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, padding]);
  
  const svg = d3.select("body").append('svg')
        .attr('width', w).attr('height', h);
  
  svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', (d,i) => padding + i*rectWid)
        .attr('y', (d,i) => yScale(d[1]))
        .attr('width', rectWid)
        .attr("height", (d, i) => h - padding - yScale(d[1]));
  
})
