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
var searchDate = d3.select("#searchDate");
var searchCity = d3.select("#searchCity");
var searchState = d3.select("#searchState");
var searchCountry = d3.select("#searchCountry");
var searchShape = d3.select("#searchShape");

// Create event handlers 
filterBtn.on("click", runFilter);

// Complete the event handler function for the Filter button - click
function runFilter() {
  // Clear contents of what's being displayed
  tbody.html("");
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Get the value property of each input element
  var dateValue = searchDate.property("value");
  var cityValue = searchCity.property("value");
  var stateValue = searchState.property("value");
  var countryValue = searchCountry.property("value");
  var shapeValue = searchShape.property("value");
  // Creating if statement for the filters to work
  var filteredData = tableData;
  if (dateValue) {
    filteredData = filteredData.filter(UFO => UFO.datetime === dateValue);
  }
  if (cityValue) {
    filteredData = filteredData.filter(UFO => UFO.city === cityValue);
  }
  if (stateValue) {
    filteredData = filteredData.filter(UFO => UFO.state === stateValue);
  }
  if (countryValue) {
    filteredData = filteredData.filter(UFO => UFO.country === countryValue);
  }
  if (shapeValue) {
    filteredData = filteredData.filter(UFO => UFO.shape === shapeValue);
  }
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

// **** TO RESET THE DATA FILTERS ****

// Create HTML object references
var btnReset = d3.select("#reset-btn");
// Reset button - click 
btnReset.on("click", () => {
  // clear the contents of the search
  document.getElementById("searchDate").value = '';
  document.getElementById("searchCity").value = '';
  document.getElementById("searchState").value = '';
  document.getElementById("searchCountry").value = '';
  document.getElementById("searchShape").value = '';
  // Clear out the previously loaded HTML:
  tbody.html("");
  // Load original dataset
  loadDataTable(tableData);
});