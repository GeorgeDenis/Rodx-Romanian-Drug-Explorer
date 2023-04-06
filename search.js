document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const resultsContainer = document.getElementById("results-container");
  
    const selects = document.querySelectorAll(".filter-select");
  
    searchButton.addEventListener("click", function () {
      // Citim valorile selectate din meniurile derulante
      const selectedValues = {};
      selects.forEach((select) => {
        selectedValues[select.name] = select.value;
      });
  
      // Afișați informațiile pe baza parametrilor selectați
      displayResults(selectedValues);
    });
  
    function displayResults(selectedValues) {
        // Aici, puteți adăuga logica pentru a afișa informațiile pe baza parametrilor selectați
        // De exemplu, puteți căuta într-o bază de date sau într-un obiect JSON pentru a filtra informațiile relevante
        // În acest exemplu, vom afișa o imagine corespunzătoare selecțiilor utilizatorului
      
        let imagePath = "";
        if (selectedValues["Tipul de drog"] === "Canabis") {
          imagePath = "poze/logo.jpg";
        } else if (selectedValues["Tipul de drog"] === "Cocaina") {
          imagePath = "poze/logo.jpg";
        } else if (selectedValues["Tipul de drog"] === "heroina") {
          imagePath = "poze/logo.jpg";
        } else {

        }
      
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = `<img src="${imagePath}" alt="Imaginea corespunzatoare cautarii">`;
      }})
