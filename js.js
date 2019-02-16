d3.select('#title').append('h1')
  .text('United States GDP').attr('id', 'title');

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(json){
  
  const dataset = json.data; // ["1947-01-01", 243.1]
  const w = 800;
  const h = 400;
  const padding = 40;
  const rectWid = (w - padding)/dataset.length;
  
  const date = dataset.map((n) => {
    return new Date(n[0]);
  });
  const barDate = dataset.map((n) =>{
    let quarter ="";
    let month = n[0].substring(5, 7);
    if(month == '01'){
      quarter = '1Q';
    } else if (month == '04'){
      quarter = '2Q';
    } else if (month == '07'){
      quarter = '3Q';
    } else if (month == '10'){
      quarter = '4Q'
    }
    return n[0].substring(0,4) + ' ' + quarter;
  });
  
  const barGdp = dataset.map((n)=> n[1] + " Billion");

  const xMax = new Date(d3.max(date));
  xMax.setMonth(xMax.getMonth() + 3);
  
  const xScale = d3.scaleTime()
        .domain([d3.min(date), xMax])
        .range([padding, w -1]);
  
  const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h - padding, 5]);//5 for y max tick value
  
  const svg = d3.select("#graph").append('svg')
        .attr('width', w).attr('height', h)
        /*.attr('id', 'graph')*/;
  
  svg.selectAll('rect').data(dataset).enter().append('rect')
        .attr('x', (d,i) => padding + i*rectWid)
        .attr('y', (d,i) => yScale(d[1]))
        .attr('width', rectWid)
        .attr("height", (d, i) => h - padding - yScale(d[1]))
        .attr("fill", "blue")
        .attr('class', 'bar')
        .attr('data-date', (d, i) => dataset[i][0])
        .attr('data-gdp', (d, i) => dataset[i][1]);
  
  svg.append('title')
        .text((d,i) => barDate[i] + ' : ' + barGdp[i])
        .attr('data-date', (d, i) => dataset[i][0])
        .attr("id", "tooltip");
  
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
      .attr('transform', "translate(" + padding + ",0)")
      .call(yAxis).attr('id', 'y-axis');
  
  const xAxis = d3.axisBottom(xScale);
  svg.append('g')
      .attr('transform', 'translate( 0,'+ (h - padding)+ ')')
      .call(xAxis).attr('id', 'x-axis');
  
})
