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
    console.log("Cererea POST a fost executată cu succes!");
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
          anchor: type === "bar" ? "center" : type === "pie" ? "center" : "end",
          align: type === "bar" ? "center" : type === "pie" ? "center" : "top",
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
function createChartForInterval(
  type,
  labels,
  data,
  backgroundColors,
  chartTitle
) {
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
      labels: type === "pie" || type === "line" ? labels : [chartTitle],
      datasets: datasets,
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Confiscari per category",
          fontSize: 22,
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
          anchor: type === "bar" ? "center" : type === "pie" ? "center" : "end",
          align: type === "bar" ? "center" : type === "pie" ? "center" : "top",
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
function createChart(type, labels, data, backgroundColors) {
  const getTextPosition = (value) => (value < 20 ? "outside" : "inside");

  let traces = [];

  if (type === "pie") {
    traces = [
      {
        values: data,
        labels: labels,
        type: type,
        textinfo: "value",
        textposition: "auto",
        insidetextorientation: "horizontal",
        marker: {
          colors: backgroundColors,
        },
        textfont: { color: "#000000" },
      },
    ];
  } else if (type === "bar") {
    traces = labels.map((label, i) => {
      return {
        x: [label],
        y: [data[i]],
        type: type,
        text: [data[i]],
        textposition: "auto",
        marker: {
          color: backgroundColors[i],
        },
        name: label,
        textfont: { color: "#000000" },
      };
    });
  } else if (type === "line") {
    traces = [
      {
        x: labels,
        y: data,
        mode: "lines+markers+text",
        name: "Urgente",
        text: data,
        textposition: "top right",
        line: {
          color: backgroundColors[0],
        },
        marker: {
          color: backgroundColors,
        },
        textfont: { color: "#000000" },
      },
    ];
  } else {
    console.error("Chart type not supported");
    return;
  }

  let layout = {
    autosize: true,
    showlegend: true,
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.2,
      xanchor: "right",
      x: 1,
    },
  };

  let config = { responsive: true };

  Plotly.newPlot("myChartsvg", traces, layout, config);
}
function deletePlot() {
  let chartDiv = document.getElementById("myChartsvg");
  Plotly.purge(chartDiv);
}
var subcategories = {
  infractiuni: ["Gen", "Grupari", "Pedepse", "Cercetari"],
  confiscari: ["Cantitate", "Capturi"],
  urgente: ["Gen", "Varsta", "Administrare", "Consum", "Diagnostic"],
};

async function fetchUrgenteData(urgenteValues) {
  console.log(urgenteValues);
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
  console.log(urgenteValues);
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
async function fetchConfiscariIntervalData(confiscariValues) {
  console.log(confiscariValues);
  const response = await fetch("/api/filter/confiscari/interval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(confiscariValues),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}
async function fetchInfractiuniIntervalData(infractiuniValues) {
  console.log(infractiuniValues);
  const response = await fetch("/api/filter/infractiuni/interval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infractiuniValues),
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

let globalResponseData = null;
let selectedCategory = null;
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
  } else if (categorieSelectValue === "confiscari") {
    specificSelectors = document.querySelectorAll("#confiscari_options select");
  } else if (categorieSelectValue === "urgente") {
    specificSelectors = document.querySelectorAll("#urgente_options select");
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
    fetchInfractiuniIntervalData(infractiuniValues)
      .then((response) => {
        const allZero = response.data.every(
          (item) => item.cantitate === 0 || item.cantitate === null
        );
        if (allZero) {
          if (chartCurent != null) {
            chartCurent.destroy();
          }
          deletePlot();
          globalResponseData = null;
          selectedCategory = null;
          document.getElementById("chartDescription").innerText =
            "Nu exista valori pentru generarea graficului pentru aceste filtre";
          return;
        }
        let description = `Infractiuni: intre ${infractiuniValues.startYearInfractiuni} si ${infractiuniValues.endYearInfractiuni}, filtrate dupa ${infractiuniValues.infractiuni_categorie}`;
        if (infractiuniValues.incadrare_filtru_infractiuni) {
          description += ` si ${infractiuniValues.incadrare_filtru_infractiuni}.`;
        }
        if (infractiuniValues.cercetari_filtru_infractiuni) {
          description += ` si ${infractiuniValues.cercetari_filtru_infractiuni}.`;
        }
        if (infractiuniValues.gen_filtru_infractiuni) {
          description += `, ${infractiuniValues.gen_filtru_infractiuni}`;
        }
        if (infractiuniValues.grupari_filtru_infractiuni) {
          description += ` si ${infractiuniValues.grupari_filtru_infractiuni}.`;
        }
        if (infractiuniValues.pedepse_filtru_infractiuni) {
          description += `, ${infractiuniValues.pedepse_filtru_infractiuni}`;
        }
        if (infractiuniValues.lege_filtru_infractiuni) {
          description += ` si ${infractiuniValues.lege_filtru_infractiuni}.`;
        }
        if (infractiuniValues.varsta_filtru_infractiuni) {
          description += ` si ${infractiuniValues.varsta_filtru_infractiuni}.`;
        }

        document.getElementById("chartDescription").innerText = "";
        document.getElementById("chartDescription").innerText = description;
        globalResponseData = response.data;
        selectedCategory = "infractiuni";
        chartData = {
          type: reprezentareSelectValue,
          labels: response.data.map((item) => item.label),
          data: response.data.map((item) => item.cantitate),
          backgroundColors: response.data.map(
            (item, index) => predefinedColors[index % predefinedColors.length]
          ),
        };
        if (chartData) {
          createChartForInterval(
            chartData.type,
            chartData.labels,
            chartData.data,
            chartData.backgroundColors,
            "Infractiuni"
          );
          createChart(
            chartData.type,
            chartData.labels,
            chartData.data,
            chartData.backgroundColors
          );
        }
      })
      .catch((error) => console.error(error));
  } else if (categorieSelectValue === "confiscari") {
    const confiscariSelects = document.querySelectorAll(
      "#confiscari_options select"
    );
    const confiscariValues = getSelectedValues(confiscariSelects);
    if (!confiscariValues) return;
    fetchConfiscariIntervalData(confiscariValues)
      .then((response) => {
        const allZero = response.data.every(
          (item) => item.cantitate === 0 || item.cantitate === null
        );
        if (allZero) {
          if (chartCurent != null) {
            chartCurent.destroy();
          }
          deletePlot();
          globalResponseData = null;
          selectedCategory = null;
          document.getElementById("chartDescription").innerText =
            "Nu exista valori pentru generarea graficului pentru aceste filtre";
          return;
        }

        const description = `Confiscari: numarul de ${confiscariValues.confiscari_subcategorie} de ${confiscariValues.drog} intre ${confiscariValues.startYearConfiscari} si ${confiscariValues.endYearConfiscari}.`;

        document.getElementById("chartDescription").innerText = "";
        document.getElementById("chartDescription").innerText = description;
        globalResponseData = response.data;
        selectedCategory = "confiscari";
        chartData = {
          type: reprezentareSelectValue,
          labels: response.data.map((item) => item.label),
          data: response.data.map((item) => item.cantitate),
          backgroundColors: response.data.map(
            (item, index) => predefinedColors[index % predefinedColors.length]
          ),
        };
        if (chartData) {
          createChartForInterval(
            chartData.type,
            chartData.labels,
            chartData.data,
            chartData.backgroundColors,
            "Confiscari"
          );
          createChart(
            chartData.type,
            chartData.labels,
            chartData.data,
            chartData.backgroundColors
          );
        }
      })
      .catch((error) => console.error(error));
  } else if (categorieSelectValue === "urgente") {
    const urgenteSelects = document.querySelectorAll("#urgente_options select");
    const urgenteValues = getSelectedValues(urgenteSelects);
    if (!urgenteValues) return;
    if (urgenteValues.urgente_an !== "interval") {
      fetchUrgenteData(urgenteValues)
        .then((response) => {
          const allZero = response.data.every((item) => item.cantitate === 0);
          if (allZero) {
            if (chartCurent != null) {
              chartCurent.destroy();
            }
            deletePlot();
            globalResponseData = null;
            selectedCategory = null;
            document.getElementById("chartDescription").innerText =
              "Nu exista valori pentru generarea graficului pentru aceste filtre";
            return;
          }

          const description = `Urgente: cazuri cauzate de ${urgenteValues.urgente_drog} in ${urgenteValues.urgente_an} filtrate dupa ${urgenteValues.urgente_filtru}.`;

          document.getElementById("chartDescription").innerText = "";
          document.getElementById("chartDescription").innerText = description;
          globalResponseData = response.data;
          selectedCategory = "urgente";
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
            createChart(
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
          const allZero = response.data.every((item) => item.cantitate === 0);
          if (allZero) {
            if (chartCurent != null) {
              chartCurent.destroy();
            }
            deletePlot();
            globalResponseData = null;
            selectedCategory = null;
            document.getElementById("chartDescription").innerText =
              "Nu exista valori pentru generarea graficului pentru aceste filtre";
            return;
          }
          let description = `Urgente: cazuri cauzate de ${urgenteValues.urgente_drog} intre ${urgenteValues.startYear} si ${urgenteValues.endYear}`;

          if (urgenteValues.urgente_filtru) {
            description += ` filtrate dupa ${urgenteValues.urgente_filtru}`;
          }
          if (urgenteValues.administrare_filtru) {
            description += `, ${urgenteValues.administrare_filtru}.`;
          }
          if (urgenteValues.varsta_filtru) {
            description += `, ${urgenteValues.varsta_filtru}.`;
          }
          if (urgenteValues.consum_filtru) {
            description += `, ${urgenteValues.consum_filtru}.`;
          }
          if (urgenteValues.diagnostic_filtru) {
            description += `, ${urgenteValues.diagnostic_filtru}.`;
          }
          globalResponseData = response.data;
          selectedCategory = "urgenteInterval";
          document.getElementById("chartDescription").innerText = "";
          document.getElementById("chartDescription").innerText = description;
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
            createChart(
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
  const exportButton = document.getElementById("export-button");
  exportButton.style.display = "inline-block";

  document.querySelectorAll(".dropdown-item").forEach(function (item) {
    item.removeEventListener("click", handleExportClick);
    item.addEventListener("click", handleExportClick);
  });
}
const handleExportClick = function () {
  if (this.textContent === "PNG") {
    var imgData = chartCurent.toBase64Image();
    var a = document.createElement("a");
    a.href = imgData;
    a.download = document.getElementById("chartDescription").innerText;
    a.click();
  } else if (this.textContent === "SVG") {
    Plotly.downloadImage("myChartsvg", {
      format: "svg",
      width: 800,
      height: 600,
      filename: document.getElementById("chartDescription").innerText,
    });
  } else if (this.textContent === "CSV") {
    if (globalResponseData == null || globalResponseData.length === 0) {
      console.error("Nu există date pentru a fi exportate în format CSV.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    if (selectedCategory === "urgente") {
      let categoryRow = ["Categorie", "Drog", "Cantitate", "Filtru", "An"].join(
        ","
      );
      csvContent += categoryRow + "\r\n";

      globalResponseData.forEach(function (item) {
        let label = item.label != null ? item.label : "";
        let drog = item.drog != null ? item.drog : "";
        let cantitate = item.cantitate != null ? item.cantitate : "";
        let filtru = item.cantitate != null ? item.filtru : "";
        let an = item.cantitate != null ? item.an : "";

        let row = [label, drog, cantitate, filtru, an].join(",");
        csvContent += row + "\r\n";
      });
    } else if (selectedCategory === "confiscari") {
      let categoryRow = ["Drog", "Categorie", "Cantitate", "An"].join(",");
      csvContent += categoryRow + "\r\n";
      globalResponseData.forEach(function (item) {
        let label = item.label != null ? item.label : "";
        let cantitate = item.cantitate != null ? item.cantitate : "";
        let drog = item.drog != null ? item.drog : "";
        let filtru = item.filtru != null ? item.filtru : "";

        let row = [drog, filtru, cantitate, label].join(",");
        csvContent += row + "\r\n";
      });
    } else if (selectedCategory === "infractiuni") {
      let categoryRow = ["Categorie", "Cantitate", "Filtru", "An"].join(",");
      let ok = false;
      csvContent += categoryRow;
      globalResponseData.forEach(function (item) {
        let categorie = item.categorie != null ? item.categorie : "";
        let label = item.label != null ? item.label : "";
        let cantitate = item.cantitate != null ? item.cantitate : "";
        let filtru = item.filtru != null ? item.filtru : "";
        let subfiltru = item.subfiltru != null ? item.subfiltru : "";
        let row = [categorie, cantitate, filtru, label].join(",");
        if (subfiltru !== "" && ok) {
          row += "," + subfiltru;
          row += "\r\n";
        } else {
          if (subfiltru !== "" && !ok) {
            csvContent += ",Subfiltru";
            csvContent += "\r\n";
            row += "," + subfiltru;
            row += "\r\n";
            ok = true;
          } else {
            csvContent += "\r\n";
            ok = true;
          }
        }
        csvContent += row;
      });
    } else if (selectedCategory === "urgenteInterval") {
      let categoryRow = ["Categorie", "Drog", "Cantitate", "Filtru", "An"].join(
        ","
      );
      csvContent += categoryRow + "\r\n";
      globalResponseData.forEach(function (item) {
        let categorie = item.categorie != null ? item.categorie : "";
        let cantitate = item.cantitate != null ? item.cantitate : "";
        let drog = item.drog != null ? item.drog : "";
        let filtru = item.filtru != null ? item.filtru : "";
        let an = item.label != null ? item.label : "";

        let row = [categorie, drog, cantitate, filtru, an].join(",");
        csvContent += row + "\r\n";
      });
    }
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      document.getElementById("chartDescription").innerText + ".csv"
    );
    document.body.appendChild(link);

    link.click();
  } else {
    console.log("Ai selectat " + this.textContent);
  }
};
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);
