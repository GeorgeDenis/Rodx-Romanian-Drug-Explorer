Chart.register(ChartDataLabels);

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
  } else {
    alert(result.message);
  }
};
function getSelectedValues(selectors) {
  let values = {};

  if (!selectors) {
    alert("Toate câmpurile trebuie să fie selectate!");
    return null;
  }

  for (let i = 0; i < selectors.length; i++) {
    let selector = selectors[i];
    let value = selector.value;
    let id = selector.id;
    if (selector.style.display === "none") {
      continue;
    }

    if (!value) {
      alert("Toate câmpurile trebuie să fie selectate!");
      return null;
    }

    values[id] = value;
  }

  return values;
}

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
let chartCurent;
function createChartForUrgente(type, labels, data, backgroundColors) {
  const ctx = document.getElementById("myChart").getContext("2d");
  if (chartCurent != null) {
    chartCurent.destroy();
  }

  let datasets = [];
  if (type === "pie") {
    datasets = [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      },
    ];
  } else if (type === "bar") {
    datasets = labels.map((label, i) => {
      return {
        label: label,
        data: [data[i]],
        backgroundColor: backgroundColors[i],
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      };
    });
  } else if (type === "line") {
    datasets = [
      {
        label: "Urgente",
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      },
    ];
  }

  chartCurent = new Chart(ctx, {
    type: type,
    data: {
      labels: type === "pie" || type === "line" ? labels : ["Urgente"],
      datasets: datasets,
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Urgente per category",
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
      plugins: {
        datalabels: {
          anchor: type === "pie" ? "center" : "end",
          align: type === "pie" ? "center" : "top",
          formatter:
            type === "pie"
              ? function (value, context) {
                  return value === 0 ? null : Math.round(value);
                }
              : Math.round(),
          font: {
            weight: "bold",
            size: 13,
          },
        },
      },
    },
  });
  return chartCurent;
}

var subcategories = {
  infractiuni: ["Gen", "Grupari", "Pedepse", "Cercetari"],
  confiscari: ["Cantitate", "Capturi"],
  urgente: ["Gen", "Varsta", "Administrare", "Consum", "Diagnostic"],
};

async function fetchUrgenteData(urgenteValues) {
  const response = await fetch("/api/filter/urgente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(urgenteValues),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}
async function fetchUrgenteIntervalData(urgenteValues) {
  const response = await fetch("/api/filter/urgente/interval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(urgenteValues),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}

const predefinedColors = [
  "#5FAD56",
  "#F2C14E",
  "#F78154",
  "#4D9078",
  "#B4436C",
  "#9FC490",
  "#0E7C7B",
  "#17BEBB",
];

async function handleSearchButtonClick(event) {
  event.preventDefault();

  const categorieSelectValue =
    document.getElementById("categorie_select").value;
  const reprezentareSelectValue = document.getElementById(
    "reprezentare_select"
  ).value;

  let specificSelectors = null;

  if (categorieSelectValue === "infractiuni") {
    specificSelectors = document.querySelectorAll(
      "#infractiuni_options select"
    );
    specificSelectorIds = ["infractiuni_an", "infractiuni_subcategorie"];
  } else if (categorieSelectValue === "confiscari") {
    specificSelectors = document.querySelectorAll("#confiscari_options select");
    specificSelectorIds = ["confiscari_an", "confiscari_subcategorie"];
  } else if (categorieSelectValue === "urgente") {
    specificSelectors = document.querySelectorAll("#urgente_options select");
    specificSelectorIds = ["urgente_an", "urgente_drog", "urgente_filtru"];
  }

  const specificValues = getSelectedValues(specificSelectors);
  if (!specificValues) return;
  const token = localStorage.getItem("token");

  const allSelectedValues = {
    categorie: categorieSelectValue,
    reprezentare: reprezentareSelectValue,
    token: token,
    ...specificValues,
  };

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
    if (urgenteValues.urgente_an !== "interval") {
      fetchUrgenteData(urgenteValues)
        .then((response) => {
          chartData = {
            type: reprezentareSelectValue,
            labels: response.data.map((item) => item.label),
            data: response.data.map((item) => item.cantitate),
            backgroundColors: response.data.map(
              (item, index) => predefinedColors[index % predefinedColors.length]
            ),
          };
          if (chartData) {
            createChartForUrgente(
              chartData.type,
              chartData.labels,
              chartData.data,
              chartData.backgroundColors
            );
          }
        })
        .catch((error) => console.error(error));
    } else {
      fetchUrgenteIntervalData(urgenteValues)
        .then((response) => {
          chartData = {
            type: reprezentareSelectValue,
            labels: response.data.map((item) => item.label),
            data: response.data.map((item) => item.cantitate),
            backgroundColors: response.data.map(
              (item, index) => predefinedColors[index % predefinedColors.length]
            ),
          };
          if (chartData) {
            createChartForUrgente(
              chartData.type,
              chartData.labels,
              chartData.data,
              chartData.backgroundColors
            );
          }
        })
        .catch((error) => console.error(error));
    }
  }

  const favoriteButton = document.getElementById("favorite-button");
  favoriteButton.style.display = "inline-block";
  favoriteButton.addEventListener("click", async () => {
    await postFilterData(allSelectedValues);
  });
}

document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
