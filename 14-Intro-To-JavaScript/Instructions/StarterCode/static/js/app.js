// from data.js
var tableData = data;

// submit button
var submit = d3.select("#filter-btn");

// call submitForm function on click
submit.on("click", submitForm);



function submitForm() {

    console.log("submitForm");

    // prevent page refresh
    d3.event.preventDefault();

    // retrieve form entry value
    var inputElement = d3.select(".form-control");
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    // date filter
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);

    // call formChange function on form change
    inputElement.on("change", formChange)

    // log filtered entries
    console.log(filteredData);

    createTable(filteredData);
}



function createTable(filteredData) {

    console.log("createTable");

    // set tbody variable by selecting html element
    var tbody = d3.select("tbody");
    
    // set up dynamic table
    filteredData.forEach(function(entry) {
        
        // log each data entry and add <tr> element to table  for each entry
        console.log(entry);
        tbody.append("tr");
        
        // add <td> element for each key value
        Object.entries(entry).forEach(function([key, value]) {
            tbody.append("td").text(value);
        });
    });
}



// form change handler
function formChange() {

    console.log("formChange");

    // clear existing table data (remove <tr> elements)
    var ufoTable = d3.select(".ufo-table");
    var tbody = d3.select("tbody");
    var rows = tbody.selectAll("tr");
    rows.remove();

    // tbody.remove();
    // var newTbody = document.createElement("tbody");
    // ufoTable.createElement("tbody");
    // ufoTable.appendChild("newTbody");
 }