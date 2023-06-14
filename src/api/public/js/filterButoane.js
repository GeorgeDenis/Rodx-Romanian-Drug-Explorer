const postFilterData = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    console.log("Cererea POST a fost executată cu succes");
    // Aici puteți adăuga cod pentru a trata răspunsul sau a afișa un mesaj de succes către utilizator
  } else {
    console.log("Cererea POST a eșuat");
    // Aici puteți trata cazul în care cererea a eșuat, cum ar fi afișarea unui mesaj de eroare către utilizator
  }
};
// Funcția pentru a obține valorile selectate dintr-un grup de selectoare
function getSelectedValues(selectors) {
  const values = {};
  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].value === "") {
      alert("Toate câmpurile trebuie să fie selectate!");
      return null;
    }
    // Aici, numele selectoarelor sunt folosite ca proprietăți ale obiectului "values"
    values[selectors[i].id] = selectors[i].value;
  }
  return values;
}

// Funcția pentru a crea și afișa un grafic
function createChart(type, labels, data, backgroundColors) {
  const ctx = document.getElementById("myChart").getContext("2d");

  return new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Population",
          data: data,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Largest Citites In Massachusetts",
          fontSize: 25,
        },
        legend: {
          position: "right",
          labels: {
            fontColor: "#000",
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        tooltips: {
          enabled: false,
        },
      },
    },
  });
}

// Funcția pentru manipularea evenimentului de click pe butonul de căutare
function handleSearchButtonClick(event) {
  event.preventDefault();

  const categorieSelectValue =
    document.getElementById("categorie_select").value;
  const reprezentareSelectValue = document.getElementById(
    "reprezentare_select"
  ).value;

  // Selectoarele specifice pentru fiecare categorie
  let specificSelectors = null;

  if (categorieSelectValue === "infractiuni") {
    specificSelectors = document.querySelectorAll(
      "#infractiuni_options select"
    );
  } else if (categorieSelectValue === "confiscari") {
    specificSelectors = document.querySelectorAll("#confiscari_options select");
  } else if (categorieSelectValue === "urgente") {
    specificSelectors = document.querySelectorAll("#urgente_options select");
  }

  // Obținem valorile selectate din selectoarele specifice
  const specificValues = getSelectedValues(specificSelectors);
  if (!specificValues) return;
  const token = localStorage.getItem("token");
  // Creăm obiectul final care va conține toate valorile selectate
  const allSelectedValues = {
    ...specificValues,
    tip: categorieSelectValue,
    reprezentare: reprezentareSelectValue,
    token: token,
  };

  console.log(allSelectedValues);

  let chartData = null;

  if (categorieSelectValue === "" || reprezentareSelectValue === "") {
    alert("Toate câmpurile trebuie să fie selectate!");
    return;
  }
  if (categorieSelectValue === "infractiuni") {
    const infractiuniSelects = document.querySelectorAll(
      "#infractiuni_options select"
    );

    const infractiuniValues = getSelectedValues(infractiuniSelects);
    if (!infractiuniValues) return;

    chartData = {
      type: reprezentareSelectValue,
      labels: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
      ],
      data: [617, 181, 153, 106, 105, 95],
      backgroundColors: ["green", "red", "blue"],
    };
  } else if (categorieSelectValue === "confiscari") {
    const confiscariSelects = document.querySelectorAll(
      "#confiscari_options select"
    );
    const confiscariValues = getSelectedValues(confiscariSelects);
    if (!confiscariValues) return;

    chartData = {
      type: reprezentareSelectValue,
      labels: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
      ],
      data: [617, 181, 153, 106, 105, 95],
      backgroundColors: ["green", "red", "blue"],
    };
  } else if (categorieSelectValue === "urgente") {
    const urgenteSelects = document.querySelectorAll("#urgente_options select");
    const urgenteValues = getSelectedValues(urgenteSelects);
    if (!urgenteValues) return;

    chartData = {
      type: reprezentareSelectValue,
      labels: [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
      ],
      data: [617, 181, 153, 106, 105, 95],
      backgroundColors: ["green", "red", "blue"],
    };
  }

  if (chartData) {
    createChart(
      chartData.type,
      chartData.labels,
      chartData.data,
      chartData.backgroundColors
    );
  }

  // Afișează butonul de favorite
  const favoriteButton = document.getElementById("favorite-button");
  favoriteButton.style.display = "inline-block";
  favoriteButton.addEventListener("click", async () => {
    await postFilterData(allSelectedValues);
  });
}

// Adaugă un eveniment de click pentru butonul de căutare
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
