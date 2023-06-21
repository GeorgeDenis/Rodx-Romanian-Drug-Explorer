function generateChart() {
  var chartContainer = document.getElementById("results-container");

  var dataPoints = [
    { label: "Canabis", y: 10 },
    { label: "Cocaina", y: 15 },
    { label: "Ecstasy", y: 25 },
    { label: "Heroina", y: 20 },
    { label: "LSD", y: 20 },
  ];

  var options = {
    title: {
      text: "Statistici despre tipurile de droguri",
    },
    width: 800,
    height: 600,
    
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };

  var chart = new CanvasJS.Chart(chartContainer, options);

  chart.render();
}

var searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function () {
  generateChart();
});