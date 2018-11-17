'use strict'

document.addEventListener('DOMContentLoaded', function(){
  getDataSet();  
});


function getDataSet(){
  let mapUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
  let dataUrl = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
  
  d3.json(mapUrl).get(function(error, map) {
    d3.json(dataUrl).get(function(error, data) {
      drawChoropeth(map, data)
    });
  });
  
}
function drawChoropeth(map, data){
  const colorSet = ['#cce6ff', '#99ccff', '#66b3ff', '#3399ff', '#0080ff', '#0066cc', '#004d99', '#003366','#001a33' ];
  
  let path = d3.geoPath();
  
  const minEducation = d3.min(data, (d) => d.bachelorsOrHigher);
  const maxEducation = d3.max(data, (d) => d.bachelorsOrHigher);
  const colorRangeFactor = (maxEducation - minEducation) / colorSet.length;
  
  
  let svgWidth = 960;
  let svgHeight = 700;
  
  let tooltip = d3.select("body")
                  .append("div")	
                  .attr("id", "tooltip")				
                  .style("opacity", 0);
  
  let svgMap = d3.select("#map-container")
                .append("svg")
                .attr("id", "map")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                ;
  
  let geojson = topojson.feature(map, map.objects.counties);
  svgMap.selectAll("path")
      .data(geojson.features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "county")
      //d3.select(foo).attr("bar")
      .attr("data-fips", d => d.id)
      .attr("data-education", (d) => { 
          return data.find(county => county.fips === d.id).bachelorsOrHigher;
      })
      .attr("transform", "translate( 0, " + 30 + ")")
      .attr("fill", d => {
        let countyId = d.id;
        let countyObj = data.find(d => d.fips === countyId);
        let colorIndex = Math.floor((countyObj.bachelorsOrHigher-minEducation) / colorRangeFactor);
        return colorSet[colorIndex]
      })
      .on("mouseover", d =>{
          let countyId = d.id
          let countyObj = data.find(d => d.fips === countyId);
          let tooltipInfo =`${countyObj.area_name}, ${countyObj.state}: ${countyObj.bachelorsOrHigher}%`; 
          tooltip.transition()		
              .duration(200)		
              .style("opacity", .85);	
          tooltip.attr("data-education", countyObj.bachelorsOrHigher);
          tooltip.html(tooltipInfo)	
              .style("left", (d3.event.pageX + 0) + "px") 
              .style("top", (d3.event.pageY - 40) + "px"); 
      }) 
      .on("mouseout", function(d) {		
            
            tooltip.transition()		
                .duration(200)		
                .style("opacity", 0);	
         }); 
  
  //Draw Legend
  let formatPercent = d3.format(".0%");
  let legendWidth = 360;
  
  let threshold = d3.scaleThreshold()
                  .domain([0.03, 0.12, 0.21, 0.30, 0.39, 0.48, 0.57, 0.66])
                  .range(colorSet);
  
  var x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, legendWidth]);

  var xAxis = d3.axisBottom(x)
    .tickSize(13)
    .tickValues(threshold.domain())
    .tickFormat(d => formatPercent(d));

  let legend = svgMap.append("g")
                .attr("id", "legend")
                .attr("width", legendWidth)
                .attr("height", 50)
                .attr("transform", "translate("+(600)+",60)");
  
  legend.call(xAxis)
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
    .attr("width", 40)
    .attr("fill", function(d) { return threshold(d[0]); })
    



}

