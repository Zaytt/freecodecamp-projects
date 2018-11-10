"use strict"



document.addEventListener('DOMContentLoaded', function(){
  getDataSet();  
});

function getDataSet(){
  let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  d3.json(url).get(function(error, d) {
    let dataset = d.data;
    dataset.forEach((d) => { d.time = new Date(d.time * 1000)});
    drawChart(dataset)
    
  });
}


function drawChart(dataset){
  
  let svgWidth = 900;
  let svgHeight = 500;
  let padding = 50;
  
//  const svg = d3.select('chart-container')
//            .attr("width", svgWidth)
//            .attr("height", svgHeight)
//            .attr("class", "bar-chart");
  
  var svg =  d3.select('#chart-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight+50)
    .attr('id', 'chart');
  
  var tooltip = d3.select("#chart-container").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

  var overlay = d3.select('#chart-container').append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);
  
  
  
  //Create a new array containing the years and Quarters
  let yearsQuartersArray = dataset.map((d) => {
    let year = d[0].substring(0, 4);
    let month = d[0].substring(5,7);
    let quarter;
    
    switch(month){
      case '01':
        quarter = 'Q1';
        break;
      case '04':
        quarter = 'Q2';
        break;
      case '07':
        quarter = 'Q3';
        break;
      case '10':
        quarter = 'Q4';
        break;
    }
    
    return year + " " + quarter;
  })
  
  //Create an array for just the years
  let yearsDateArray = dataset.map( item => new Date(item[0]));
  
  let GDPArray = dataset.map( item => item[1]);
  
  
  /***************************************
   DEFINING THE SCALES
  ***************************************/
  //Create the scales for the chart
  let xScale = d3.scaleTime()
                .range([padding, svgWidth-padding])
                .domain(d3.extent(yearsDateArray));
  
  let gdpRange = d3.extent(dataset, d => d[1] );
  
  
  let yScale = d3.scaleLinear()
                .range([ svgHeight-padding, 0])
                .domain([0, gdpRange[1]+1000])
  
  /***************************************
   DEFINING THE AXES
  ***************************************/
  //Define the axes for the chart
  const xAxis = d3.axisBottom()
    .scale(xScale);
  const yAxis = d3.axisLeft(yScale);

  //Draw x Axis
  svg.append("g")
   .attr("transform", "translate(0, " + (svgHeight-padding) + ")")
   .attr("id", "x-axis")
   .call(xAxis);
  
  //Draw y Axis
  svg.append("g")
   .attr("transform", "translate(" + (padding) + ", 0)")
   .attr("id", "y-axis")
   .call(yAxis);
  
  //Add label for y axis
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 80)
    .text('Gross Domestic Product');
  
  //Add label for x axis
  svg.append('text')
    .attr('x', svgWidth/2-20)
    .attr('y', svgHeight)
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('class', 'info');
  
  
  /***************************************
   DEFINING THE BARS
  ***************************************/
  let barWidth = (svgWidth-2*padding)/dataset.length;
  
  //Add the bars to the svg
  svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append('rect')
      .attr("x", (d, i) => padding + i * barWidth)
      .attr("y", (d, i) => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d, i) => svgHeight - yScale(d[1])-padding)
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on('mouseover', function(d, i) {
    
        let chart = document.getElementById('chart');
        var chartPos = chart.getBoundingClientRect();
    
        overlay.transition()
            .duration(0)
            .style('height', svgHeight - yScale(d[1])-padding + 'px')
            .style('width', barWidth + 'px')
            .style('opacity', .9)
            .style('left', (i * barWidth) + padding + chartPos.left + 'px')
            .style('top', yScale(d[1])+100 + 'px')

    
      
    
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(yearsQuartersArray[i] + '<br>' + '$' + GDPArray[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion')
            .attr('data-date', dataset[i][0])
            .style('left', (i * barWidth) + chartPos.left + 'px')
            .style('top', svgHeight - 100 + 'px')
            .style('transform', 'translateX(60px)');
      }) 
      .on('mouseout', function(d) {
        tooltip.transition()
              .duration(200)
              .style('opacity', 0);
            overlay.transition()
              .duration(200)
              .style('opacity', 0);
          });  
}

