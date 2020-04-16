// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
  width = 1050 - margin.left - margin.right,
  height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page

function dateConverter(dateString){
  return dateString.substring(0,4)+"-"+dateString.substring(4,6)+"-"+dateString.substring(6,8);
}


var svgFinal = d3.select("#attempt")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  // .style("border", "solid black") // <<---- remove border in final graph
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/DATASET-4.csv").then(function(data){
    // List of subgroups = header of the csv files = soil condition here
  console.log(data)
  groups = [];
  dataReadyMaster = [];
  subgroups = ["mild", "serious", "critical"];
//     dataReady={};

    for(var i = 0;i<data.length;i++){
      elementObj = {};
      elementObj["group"]=dateConverter(data[i]["date"]);

      // setting mild cases
      if(data[i]["hospitalizedCurrently"] == ""){
        elementObj["mild"] = 0;
      }else{
        elementObj["mild"]=parseInt(data[i]["hospitalizedCurrently"]);
      }
      
      //setting serious
      if(data[i]["inIcuCurrently"] == ""){
        elementObj["serious"] = 0;
      }else{
        elementObj["serious"]=parseInt(data[i]["inIcuCurrently"]);
      }

      //setting critical
      if(data[i]["onVentilatorCurrently"] == ""){
        elementObj["critical"] = 0;
      }else{
        elementObj["critical"]=parseInt(data[i]["onVentilatorCurrently"]);
      }

      groups.unshift(dateConverter(data[i]["date"]));
      dataReadyMaster.unshift(elementObj);
    }

    console.log(dataReadyMaster);

 
  //Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])

  svgFinal.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text")
    .attr("transform", "translate(-10,10)rotate(-70)")
    .style("text-anchor", "end")
    .style("font-size", 10)
    .style("fill", "#69a3b2");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 70000])
    .range([ height, 0 ]);
    svgFinal.append("g")
    .call(d3.axisLeft(y));

//   // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups) // array of categorical values
    .range(d3.schemeSet2)

//   //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (dataReadyMaster)


// // //   // Show the bars
svgFinal.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data["group"]); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
});


var svgLegendMild = d3.select("#legendMild").append("svg").attr("width", 12).attr("height", 20)
svgLegendMild.append('rect')
  .attr('x', 5)
  .attr('y', 5)
  .attr('width', 10)
  .attr('height', 10)
  .attr('fill', "#66c2a5");

var svgLegendSerious = d3.select("#legendSerious").append("svg").attr("width", 12).attr("height", 20)
svgLegendSerious.append('rect')
    .attr('x', 5)
    .attr('y', 5)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', "#fc8d62");

var svgLegendCritical = d3.select("#legendCritical").append("svg").attr("width", 12).attr("height", 20)
svgLegendCritical.append('rect')
  .attr('x', 5)
  .attr('y', 5)
  .attr('width', 10)
  .attr('height', 10)
  .attr('fill', "#8da0cb");