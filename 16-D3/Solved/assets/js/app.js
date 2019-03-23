// @TODO: YOUR CODE HERE!

// Get Gata
var url = "/assets/data/data.csv";

// read data using d3.csv
d3.csv(url).then(function(healthData) {
    console.log(healthData);
    healthData.forEach(function(data) {
        //console.log(data.abbr);
    });


//   id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,
//   healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh

// Format Data
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log(data.abbr);
    });
    
// Build Scatterplots (HealthCare vs. Poverty %)
    // plot area
        // wrapping & svg area parameters
        var svgWidth = 960;
        var svgHeight = 500;

        var margin = {
            top: 60,
            right: 60,
            bottom: 60,
            left: 60
        };

        var height = svgHeight - margin.top - margin.bottom;
        var width = svgWidth - margin.left - margin.right;

        // select correct div for chart placement
        var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
            
        // append chartgroup for scatter plot
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x-axis (In Poverty %)

        // calculate min and max
        var xMax = d3.max(healthData, data => data.poverty);
        var xMin = d3.min(healthData, data => data.poverty);
        console.log(`xmax: ${xMax}`);
        console.log(`xmin: ${xMin}`);

        // x-scale
        var xScale = d3.scaleLinear()
            .domain([0, xMax])
            .range([0, width]);

        // create x-axis function
        var bottomAxis = d3.axisBottom(xScale);

        // add x-axis
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

    // y-axis (Lacks Healthcare %)

        // calculate min and max
        var yMax = d3.max(healthData, data => data.healthcare);
        var yMin = d3.min(healthData, data => data.healthcare);
        console.log(`ymax: ${yMax}`);
        console.log(`ymin: ${yMin}`);

        // y-scale
        var yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([height, 0]);
        
        // create y-axis function
        var leftAxis = d3.axisLeft(yScale);

        // add y-axis
        chartGroup.append("g")
            .call(leftAxis);
    
    // chart and axis titles
    // x-axis title
    svg.append("text")
        .attr("y", (svgHeight - (margin.bottom/2)))
        .attr("x", (svgWidth/2))
        .attr("text-anchor", "middle")
        .attr("class", "axisText")
        .text("in Poverty (%)");
    // y-axis title
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -svgHeight/2)
        .attr("y", margin.left/2)
        .attr("text-anchor", "middle")    
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");


    // svg circles for scatter plot
    var scatterPoints = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", data => xScale(data.poverty))
        .attr("cy", data => yScale(data.healthcare))
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", "0.4")
        .classed("circles", true);

    var labels = chartGroup.selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .attr("x", data => xScale(data.poverty))
        .attr("y", data => yScale(data.healthcare)+2)
        .text(data => data.abbr)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white");
        
        


      
// D3-tip
// Dynamic Table
});

