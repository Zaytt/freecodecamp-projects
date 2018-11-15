document.addEventListener('DOMContentLoaded', function(){
  getDataSet();  
});


function getDataSet(){
  let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  d3.json(url).get(function(error, d) {
    let dataset = d;
    drawHeatMap(dataset)
  });
  
}
function drawHeatMap(dataset){
  
  let baseTemp = dataset.baseTemperature;
  let tempData = dataset.monthlyVariance; 
  
  let svgWidth = 1300;
  let svgHeight = 600;
  let padding = 100;
  
  let chartWidth = svgWidth-padding;
  let chartHeight = svgHeight-padding;
  
  //Draw the svg
  let svg =  d3.select('#chart-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr('id', 'chart');
  
  // Define the div for the tooltip
  let tooltip = d3.select("body").append("div")	
    .attr("id", "tooltip")				
    .style("opacity", 0);
  
  //Draw subtitle
  svg.append("text")
      .html(`1753 - 2015: base temperature ${baseTemp} &#176;C`)
      .attr("id", "description")
      .attr("x", svgWidth/2 - 150)
      .attr("y", 20);
  
  //parse data
  let yearsArray = tempData.map( d => d.year);
  let minYear = new Date(d3.min(yearsArray), 0);
  let maxYear = new Date(d3.max(yearsArray), 0);
  let minMonth = new Date(0, 0);
  let maxMonth = new Date(0, 11);
  
  
  //Define the scales
  let xScale = d3.scaleTime()
                .range([padding, chartWidth])
                .domain([minYear, maxYear]);
  
  let yScale = d3.scaleTime()
                .range([padding, chartHeight])
                .domain([minMonth, maxMonth]);
  

  const xAxis = d3.axisBottom(xScale)
                  .ticks(d3.timeYear, 10)
                  .tickSize(10)
                  .tickSizeOuter(0) 
                  .tickFormat(d3.timeFormat("%Y"));
  const yAxis = d3.axisLeft(yScale)
                  .ticks(d3.timeMonth)
                  .tickSize(10)
                  .tickFormat(d3.timeFormat("%B"));
  
  //Draw x Axis
  svg.append("g")
   .style("font-size", "12px")
   .attr("transform", "translate(0, " + (chartHeight) + ")")
   .attr("id", "x-axis")
   .call(xAxis);
  
  //Draw y Axis
  svg.append("g")
   .style("font-size", "14px")
   .attr("id", "y-axis")
   .call(yAxis)
   .attr("transform", "translate("+padding+", " + -20 + ")")
    .selectAll(".tick text")
    .attr("y", -0);
  
  
  
  
  //Draw heatmap
  console.log(tempData);
  svg.selectAll("rect")
      .data(tempData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(new Date(d.year, 0)) )
      .attr("y", (d) => yScale(new Date(0, d.month-1)) )
      .attr("width", chartWidth/270)
      .attr("height", (chartHeight/13.5))
      .attr("transform", "translate(0, " + -36 + ")")
      .attr("data-year", (d) => d.year)
      .attr("data-month", (d) => d.month-1)
      .attr("data-temp", (d) => baseTemp + d.variance)
      .attr("class", "cell")
      .attr("fill", (d) => {
        return setTempColor(baseTemp+d.variance);
      })
      .on("mouseover", d =>{
            
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            let tooltipInfo =`${d.year} - ${monthNames[d.month]}<br>${Math.round((baseTemp+d.variance) * 10) / 10} &#176;C <br> ${Math.round(d.variance*10)/10} &#176;C`; 
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .7);	
            tooltip.attr("data-year", d.year);
            tooltip.html(tooltipInfo)	
                .style("left", xScale(new Date(d.year, 0)) - 40)		
                .style("top", yScale(new Date(0, d.month-1)) - 40)  
            tooltip.attr("data-year",  d.year);
         })
      .on("mouseout", function(d) {		
            
            tooltip.transition()		
                .duration(200)		
                .style("opacity", 0);	
         }); ;
  
  //Rect to connect the y axis to the x axis
  svg.append("rect")
    .attr("width", "1px")
    .attr("height", chartHeight-62)
    .attr("x", padding)
    .attr("y", 63)
  
  //Right rect
  svg.append("rect")
    .attr("width", "1px")
    .attr("height", chartHeight-62)
    .attr("x", chartWidth+4)
    .attr("y", 63)
  
  //Top rect
  svg.append("rect")
    .attr("width", chartWidth-padding+5)
    .attr("height", "1px")
    .attr("x", padding)
    .attr("y", padding-37)
  
  //Bottom rect
  svg.append("rect")
    .attr("width", chartWidth-padding+5)
    .attr("height", "1px")
    .attr("x", padding)
    .attr("y", chartHeight)
    
  //draw legend
  let formatNumber = d3.format(".0f");
  let threshold  = d3.scaleThreshold()
    .domain([2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8])
    .range(["navy", "steelblue", "lightsteelblue", "lightblue", "aliceblue", "lightyellow", "papayawhip", "navajowhite", "orange", "coral", "indianred"]);
  
  let x = d3.scaleLinear()
    .domain([1.7, 13.9])
    .range([padding, 600]);

  let legendAxis = d3.axisBottom(x)
    .tickSize(15)
    .tickValues(threshold.domain())
    .tickFormat(function(d) { return d});

  let legend = d3.select("#legend");
  legend.call(legendAxis).style("font-size", "12px");

  legend.select(".domain")
      .remove();

  legend.selectAll("rect")
    .data(threshold.range().map(function(color) {
      var d = threshold.invertExtent(color);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
    .enter().insert("rect", ".tick")
      .attr("height", 8)
      .attr("x", function(d) { return x(d[0]); })
      .attr("y", 0)
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("fill", function(d) { return threshold(d[0]); })

  
}

function setTempColor(temp){
        if(temp <= 2.8 ){
          return "navy";
        } else if(temp > 2.8 && temp <= 3.9 ){
          return "steelblue";
        } else if(temp > 3.9 && temp <= 5.0 ){
          return "lightsteelblue";
        } else if(temp > 5.0 && temp <= 6.1 ){
          return "lightblue";
        } else if(temp > 6.1 && temp <= 7.2 ){
          return "aliceblue";
        } else if(temp > 7.2 && temp <= 8.3 ){
          return "lightyellow";
        } else if(temp > 8.3 && temp <= 9.5 ){
          return "papayawhip";
        } else if(temp > 9.5 && temp <= 10.6 ){
          return "navajowhite";
        } else if(temp > 10.6 && temp <= 11.7 ){
          return "orange";
        } else if(temp > 11.7 && temp <= 12.8 ){
          return "coral";
        } else if(temp > 12.8 ){
          return "indianred";
        }
}

