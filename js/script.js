// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 60, left: 30},
  width = 850 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("border", "solid black") // <<---- remove border in final graph
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv").then(function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB", "valueC"]

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.time, value: +d[grpName]};
        })
      };
    });
    // I strongly advise to have a look to dataReady with
    // console.log(dataReady)

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,10])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a legend at the end of each line
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

});


function checkFormatDate(dateString){
  if(dateString.includes("/")){
    return dateString;
  }
  else{
    dateParts;
  }

}


var svgExam = d3.select("#exam")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.style("border", "solid black") // <<---- remove border in final graph
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("data/dummy_dataset4 -exam.csv").then(function(data) {
        console.log(data);
        
        allGroup = [];
        dataReadyMaster = [];
        

        for(var i = 0;i<data.length;i++){
          dataReady = {};
          xTicksValues = [];
          dataReady["name"] = data[i]["Country/Region"];
          allGroup.push(data[i]["Country/Region"]);
          keyList = [];
          keyList = Object.keys(data[i]);
          valuesList = Object.values(data[i]);
          valueObj = [];
          
          for(var j = 4; j<keyList.length;j++){
            elementObj = {};
            elementObj["time"] = j;
            xTicksValues.push(keyList[j]);  // check this
            elementObj["value"] = valuesList[j];
            valueObj.push(elementObj);
          }
          dataReady["values"] = valueObj;
          dataReadyMaster.push(dataReady);
        }

      
          // A color scale: one color for each group
          var myColor = d3.scaleOrdinal()
            .domain(allGroup)
            .range(d3.schemeSet2);
      
          // Add X axis --> it is a date format
          var x = d3.scaleLinear()
            .domain([0,82])
            .range([ 0, width ]);

          svgExam.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(80).tickFormat(function(d, i){ return xTicksValues[i]}))
            .selectAll("text")
              .attr("transform", "translate(-10,10)rotate(-70)")
              .style("text-anchor", "end")
              .style("font-size", 10)
              .style("fill", "#69a3b2");
      
          // Add Y axis
          var y = d3.scaleLinear()
            .domain( [0,570])
            .range([ height, 0 ]);
            svgExam.append("g")
            .call(d3.axisLeft(y));
      
          // Add the lines
          var line = d3.line()
            .x(function(d) { 
              return x(+d.time) 
            })
            .y(function(d) { 
              return y(+d.value) 
            })
            svgExam.selectAll("myLines")
            .data(dataReadyMaster)
            .enter()
            .append("path")
              .attr("id", function(d, i) {return i})
              .attr("d", function(d){ return line(d.values) } )
              //.attr("stroke", function(d){ return myColor(d.name) })
              .attr("stroke", function(d){ return "#dddddd" })
              .style("stroke-width", 2)
              .style("fill", "none")
              .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut);


          function handleMouseOver(){
            element = d3.select(this);

            element
            .attr("stroke", "red" );
            
          }

          function handleMouseOut(){
            element = d3.select(this);

            element
            .attr("stroke", "#dddddd" );
          }
          // Add the points
          // svgExam
          //   // First we need to enter in a group
          //   .selectAll("myDots")
          //   .data(dataReady)
          //   .enter()
          //     .append('g')
          //     .style("fill", function(d){ return myColor(d.name) })
          //   // Second we need to enter in the 'values' part of this group
          //   .selectAll("myPoints")
          //   .data(function(d){ return d.values })
          //   .enter()
          //   .append("circle")
          //     .attr("cx", function(d) { return x(d.time) } )
          //     .attr("cy", function(d) { return y(d.value) } )
          //     .attr("r", 5)
          //     .attr("stroke", "white")
      
          // // Add a legend at the end of each line
          // svgExam
          //   .selectAll("myLabels")
          //   .data(dataReady)
          //   .enter()
          //     .append('g')
          //     .append("text")
          //       .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          //       .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          //       .attr("x", 12) // shift the text a bit more right
          //       .text(function(d) { return d.name; })
          //       .style("fill", function(d){ return myColor(d.name) })
          //       .style("font-size", 15)
      
      })


