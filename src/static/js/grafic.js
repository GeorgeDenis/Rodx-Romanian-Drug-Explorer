function generateChart() {
    // Obțineți containerul pentru grafic
    var chartContainer = document.getElementById("results-container");
  
    // Definește datele de intrare pentru grafic
    var dataPoints = [
      { label: "Canabis", y: 10 },
      { label: "Cocaina", y: 15 },
      { label: "Ecstasy", y: 25 },
      { label: "Heroina", y: 20 },
      { label: "LSD", y: 20 },
    ];
  
    // Definește opțiunile pentru grafic
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
  
    // Generează graficul folosind opțiunile și containerul specificat
    var chart = new CanvasJS.Chart(chartContainer, options);
  
    chart.render();
  }
  
  // Obțineți butonul de căutare
  var searchButton = document.getElementById("search-button");
  
  // Adăugați un eveniment de click la butonul de căutare
  searchButton.addEventListener("click", function () {
    generateChart();
  });