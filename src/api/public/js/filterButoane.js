// Funcția pentru a obține valorile selectate dintr-un grup de selectoare
function getSelectedValues(selectors) {
  const values = [];
  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].value === "") {
      alert("Toate câmpurile trebuie să fie selectate!");
      return null;
    }
    values.push(selectors[i].value);
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

  let chartData = null;

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
  } else if (categorieSelectValue === "urgente_medicale") {
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
}

// Adaugă un eveniment de click pentru butonul de căutare
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
// Funcția pentru a obține valorile selectate dintr-un grup de selectoare
function getSelectedValues(selectors) {
  const values = [];
  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].value === "") {
      alert("Toate câmpurile trebuie să fie selectate!");
      return null;
    }
    values.push(selectors[i].value);
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

  let chartData = null;

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
  } else if (categorieSelectValue === "urgente_medicale") {
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
}

// Adaugă un eveniment de click pentru butonul de căutare
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
// Funcția pentru a obține valorile selectate dintr-un grup de selectoare
function getSelectedValues(selectors) {
  const values = [];
  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].value === "") {
      alert("Toate câmpurile trebuie să fie selectate!");
      return null;
    }
    values.push(selectors[i].value);
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

  let chartData = null;

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
  } else if (categorieSelectValue === "urgente_medicale") {
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
}

// Adaugă un eveniment de click pentru butonul de căutare
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
