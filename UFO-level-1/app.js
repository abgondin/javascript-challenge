// **** LOAD INITIAL DATA ****
// Assign the data from `data.js` to a descriptive variable
var tableData = data;

// Create HTML object references
var tbody = d3.select("tbody");

// Display all the data in the tbody section
function loadDataTable(whichData) {
  whichData.forEach(UFO => {
    console.log(UFO);
    var row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
};

loadDataTable(tableData);

// **** TO FILTER DATA ****

// Create HTML object references
var filterBtn = d3.select("#filter-btn");
var inputElement = d3.select("#datetime");

// Create event handlers 
filterBtn.on("click", runFilter);

// Complete the event handler function for the Filter button - click
function runFilter() {
  // Clear contents of what's being displayed
  tbody.html("");
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  console.log(inputValue);
  // Filter Data with datetime equal to input value
  var filteredData = tableData.filter(UFO => UFO.datetime === inputValue);
  console.log(filteredData);

  // Conditional statement to account for wrong date
  if (filteredData.length === 0) {
    // Clear out the previously loaded HTML:
    tbody.html("");
    // Tell them "No rows match"
    tbody.append("tr").append("td").text("No UFO sightings on this date");
  }
  else {
    // Display all the filtered data in the tbody section
    loadDataTable(filteredData);
  }
};

// **** TO RESET THE DATA FILTER ****

// Create HTML object references
var btnReset = d3.select("#reset-btn");
// Reset button - click 
btnReset.on("click", () => {
  // clear the contents of the search
  document.getElementById("datetime").value = '';
  // Clear out the previously loaded HTML:
  tbody.html("");
  // Load original dataset
  loadDataTable(tableData);
});