function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(data) {
    console.log(data);

    // Use d3 to select the panel with id of `#sample-metadata`
    metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    //Object.entries(data).forEach(([key, value]) => console.log(`${key}: ${value}`));
    Object.entries(data).forEach(([key, value]) => metadataPanel.append("div").text(`${key}:${value}`));
      
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(data) {
    console.log(data)

    // @TODO: Build a Bubble Chart using the sample data
    otuIds = data.otu_ids;
    otuLabels = data.otu_labels;
    sampleValues = data.sample_values;
    
    var bubbleTrace = {
      x: otuIds,    
      y: sampleValues,
      text: otuLabels,
      mode: 'markers', 
      marker: {
        color: otuIds,  
        size: sampleValues
      }      
    
    };

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
      title: "Bubbles",
      showLegend: true,
      xaxis: {title: "otu ID"},
      yaxis: {title: "Sample Value"}
    }

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    const valuesSorted = sampleValues.sort(function compareFunction(first, second) {
      return second - first;
    });
    // console.log(valuesSorted);

    const valuesSliced = valuesSorted.slice(0, 10);
    console.log(valuesSliced);

    // console.log(otuLabels);
    // console.log(sampleValues);
    // console.log(otuIds);
   
    var pieTrace = {
      values: valuesSliced,
      labels: otuIds,
      hoverinfo: otuLabels,
      type: 'pie'
    };

    var pieData = [pieTrace];

    var pieLayout = {
       title: "Sample Values"
    }

    Plotly.newPlot('pie', pieData, pieLayout);
   

  });   
 
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
