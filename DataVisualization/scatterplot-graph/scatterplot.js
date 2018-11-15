'use strict'

document.addEventListener('DOMContentLoaded', function(){
  getDataSet();  
});


function getDataSet(){
  let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  d3.json(url).get(function(error, d) {
    let dataset = d;
    drawScatterPlot(dataset)
  });
  
}
function drawScatterPlot(dataset){
  
  
  //Define the graph size
  
  let svgWidth = 900;
  let svgHeight = 500;
  let padding = 50;
  
  let chartWidth = svgWidth-padding;
  let chartHeight = svgHeight-padding;
  
  //Draw the svg
  let svg =  d3.select('#main')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr('id', 'chart');
  
  // Define the div for the tooltip
  let tooltip = d3.select("body").append("div")	
    .attr("id", "tooltip")				
    .style("opacity", 0);
  
  //Define arrays to use for scale domains
  let yearsArray = dataset.map( item => item.Year);
  let secondsArray = dataset.map( item => item.Seconds);
  
  
  //Define min and max values for x scale
  let minYear = new Date(d3.min(yearsArray)-1, 0);
  let maxYear = new Date(d3.max(yearsArray)+1, 0);
  
  //Define the scales
  let xScale = d3.scaleTime()
                .range([padding, chartWidth])
                .domain([minYear, maxYear]);
  
  let yScale = d3.scaleTime()
                .range([padding, chartHeight])
                .domain([d3.min(secondsArray)*1000, d3.max(secondsArray) * 1000]);
  
  var timeFormat = d3.timeFormat("%M:%S");
  //Define the axes for the chart
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale)
                  .ticks(d3.timeSecond, 15)
                  .tickFormat(timeFormat);
  
  //Draw the axes
  //Draw x Axis
  svg.append("g")
   .attr("transform", "translate(0, " + (chartHeight) + ")")
   .attr("id", "x-axis")
   .call(xAxis);
  
  //Draw y Axis
  svg.append("g")
   .attr("transform", "translate(" + (padding) + ", 0)")
   .attr("id", "y-axis")
   .call(yAxis);
  
  //Draw the circles
  svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", (d, i) => xScale(new Date(""+d.Year)))
         .attr("cy", (d, i) => yScale(d.Seconds*1000))
         .attr("r", 6)
         .attr("class", "dot")
         .attr("data-xvalue", d => d.Year)
         .attr("data-yvalue", d => new Date(d.Seconds*1000))
         .attr("fill", (d) => {
           return d.Doping === "" ? "orange": "dodgerblue";
         })
  
        //Add the tooltips for each circle
         .on("mouseover", d =>{
            let tooltipInfo = d.Doping === "" ? 
                `${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}` : `${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}<br><br>${d.Doping}`; 
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .9);		
            tooltip.html(tooltipInfo)	
                .style("left", (d3.event.pageX + 10) + "px")		
                .style("top", (d3.event.pageY - 30) + "px")  
            tooltip.attr("data-year",  d.Year);
         })
         .on("mouseout", function(d) {		
            tooltip.transition()		
                .duration(500)		
                .style("opacity", 0);	
         });  
  
  //Draw chart legend
  svg.append("text")
        .text("No doping allegations")
        .attr("x", svgWidth-50)
        .attr("y", svgHeight/2)
        .attr("width", "150px")
        .attr("text-anchor", "end")
        .attr("class", "legend")
        .attr("id", "legend");
  svg.append("rect")
        .attr("x", svgWidth-40)
        .attr("y", svgHeight/2-15)
        .attr("height", "20px")
        .attr("width", "20px")
        .attr("fill", "orange");
  
  svg.append("text")
        .text("Riders with doping allegations")
        .attr("x", svgWidth-50)
        .attr("y", svgHeight/2 + 25)
        .attr("text-anchor", "end")
        .attr("class", "legend");
  svg.append("rect")
        .attr("x", svgWidth-40)
        .attr("y", svgHeight/2-15 + 25)
        .attr("height", "20px")
        .attr("width", "20px")
        .attr("fill", "dodgerblue");
      
}