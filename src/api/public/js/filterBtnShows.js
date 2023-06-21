function resetButtons() {
  const favoriteButton = document.getElementById("favorite-button");
  const exportButton = document.getElementById("export-button");

  favoriteButton.style.display = "none";
  exportButton.style.display = "none";
  favoriteButton.value = "";
  exportButton.value = "";
}

document
  .getElementById("categorie_select")
  .addEventListener("change", function () {
    document.getElementById("infractiuni_options").style.display = "none";
    document.getElementById("confiscari_options").style.display = "none";
    document.getElementById("urgente_options").style.display = "none";

    document.getElementById("chartDescription").innerText = "";

    if (this.value === "infractiuni") {
      document.getElementById("infractiuni_options").style.display = "flex";
    } else if (this.value === "confiscari") {
      document.getElementById("confiscari_options").style.display = "flex";
    } else if (this.value === "urgente") {
      document.getElementById("urgente_options").style.display = "flex";
    }
    resetButtons();
  });

document
  .getElementById("urgente_filtru")
  .addEventListener("change", function () {
    let urgentAnValue = document.getElementById("urgente_an").value;

    if (urgentAnValue === "interval") {
      document.getElementById("gen_filtru").style.display = "none";
      document.getElementById("varsta_filtru").style.display = "none";
      document.getElementById("administrare_filtru").style.display = "none";
      document.getElementById("consum_filtru").style.display = "none";
      document.getElementById("diagnostic_filtru").style.display = "none";

      if (this.value === "Gen") {
        document.getElementById("gen_filtru").style.display = "flex";
      } else if (this.value === "Varsta") {
        document.getElementById("varsta_filtru").style.display = "flex";
      } else if (this.value === "Administrare") {
        document.getElementById("administrare_filtru").style.display = "flex";
      } else if (this.value === "Consum") {
        document.getElementById("consum_filtru").style.display = "flex";
      } else if (this.value === "Diagnostic") {
        document.getElementById("diagnostic_filtru").style.display = "flex";
      }
    }
    resetButtons();
  });

document.getElementById("urgente_an").addEventListener("change", function () {
  let selectElement = document.getElementById("urgente_an");
  let startYearSelect, endYearSelect;

  if (!document.getElementById("startYear") && this.value === "interval") {
    startYearSelect = document.createElement("select");
    startYearSelect.id = "startYear";
    startYearSelect.classList.add("filter-select");
    startYearSelect.innerHTML = `
      <option value="" disabled selected>An început</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    `;

    endYearSelect = document.createElement("select");
    endYearSelect.id = "endYear";
    endYearSelect.classList.add("filter-select");
    endYearSelect.innerHTML =
      '<option value="" disabled selected>An sfârșit</option>';

    selectElement.insertAdjacentElement("afterend", startYearSelect);
    startYearSelect.insertAdjacentElement("afterend", endYearSelect);

    startYearSelect.addEventListener("change", function () {
      let startYear = parseInt(this.value);
      let endYearOptions = "";
      for (let i = startYear + 1; i <= 2022; i++) {
        endYearOptions += `<option value="${i}">${i}</option>`;
      }
      endYearSelect.innerHTML =
        `<option value="" disabled selected>An sfârșit</option>` +
        endYearOptions;
    });

    document.getElementById("gen_filtru").style.display = "none";
    document.getElementById("varsta_filtru").style.display = "none";
    document.getElementById("administrare_filtru").style.display = "none";

    let filtruValoare = document.getElementById("urgente_filtru").value;
    if (filtruValoare === "Gen") {
      document.getElementById("gen_filtru").style.display = "flex";
    } else if (filtruValoare === "Varsta") {
      document.getElementById("varsta_filtru").style.display = "flex";
    } else if (filtruValoare === "Administrare") {
      document.getElementById("administrare_filtru").style.display = "flex";
    } else if (filtruValoare === "Consum") {
      document.getElementById("consum_filtru").style.display = "flex";
    } else if (filtruValoare === "Diagnostic") {
      document.getElementById("diagnostic_filtru").style.display = "flex";
    }
  } else if (
    document.getElementById("startYear") &&
    this.value !== "interval"
  ) {
    document.getElementById("startYear").remove();
    document.getElementById("endYear").remove();
    document.getElementById("gen_filtru").style.display = "none";
    document.getElementById("varsta_filtru").style.display = "none";
    document.getElementById("administrare_filtru").style.display = "none";
    document.getElementById("consum_filtru").style.display = "none";
    document.getElementById("diagnostic_filtru").style.display = "none";
  }
  resetButtons();
});
const startYearConfiscari = document.getElementById("startYearConfiscari");
const endYearConfiscari = document.getElementById("endYearConfiscari");

startYearConfiscari.addEventListener("change", function () {
  let startYear = parseInt(this.value);
  let endYearOptions = "";
  for (let i = startYear + 1; i <= 2022; i++) {
    endYearOptions += `<option value="${i}">${i}</option>`;
  }
  endYearConfiscari.innerHTML =
    `<option value="" disabled selected>An sfârșit</option>` + endYearOptions;
  resetButtons();
});

const startYearInfractiuni = document.getElementById("startYearInfractiuni");
const endYearInfractiuni = document.getElementById("endYearInfractiuni");

startYearInfractiuni.addEventListener("change", function () {
  let startYear = parseInt(this.value);
  let endYearOptions = "";
  for (let i = startYear + 1; i <= 2022; i++) {
    endYearOptions += `<option value="${i}">${i}</option>`;
  }
  endYearInfractiuni.innerHTML =
    `<option value="" disabled selected>An sfârșit</option>` + endYearOptions;
  resetButtons();
});

document
  .getElementById("infractiuni_categorie")
  .addEventListener("change", function () {
    document.getElementById("gen_filtru_infractiuni").style.display = "none";
    document.getElementById("cercetari_filtru_infractiuni").style.display =
      "none";
    document.getElementById("incadrare_filtru_infractiuni").style.display =
      "none";
    document.getElementById("grupari_filtru_infractiuni").style.display =
      "none";
    document.getElementById("pedepse_filtru_infractiuni").style.display =
      "none";

    if (this.value === "Gen") {
      document.getElementById("gen_filtru_infractiuni").style.display = "flex";
    } else if (this.value === "Cercetari") {
      document.getElementById("cercetari_filtru_infractiuni").style.display =
        "flex";
    } else if (this.value === "Incadrare juridica") {
      document.getElementById("incadrare_filtru_infractiuni").style.display =
        "flex";
    } else if (this.value === "Grupari") {
      document.getElementById("grupari_filtru_infractiuni").style.display =
        "flex";
    } else if (this.value === "Pedepse") {
      document.getElementById("pedepse_filtru_infractiuni").style.display =
        "flex";
    }
    resetButtons();
  });
document
  .getElementById("infractiuni_categorie")
  .addEventListener("change", function () {
    document.getElementById("varsta_filtru_infractiuni").style.display = "none";
    document.getElementById("lege_filtru_infractiuni").style.display = "none";

    if (this.value === "Gen") {
      document.getElementById("gen_filtru_infractiuni").style.display = "flex";
      document
        .getElementById("gen_filtru_infractiuni")
        .addEventListener("change", function () {
          document.getElementById("varsta_filtru_infractiuni").style.display =
            this.value ? "flex" : "none";
        });
    } else if (this.value === "Pedepse") {
      document.getElementById("pedepse_filtru_infractiuni").style.display =
        "flex";
      document
        .getElementById("pedepse_filtru_infractiuni")
        .addEventListener("change", function () {
          document.getElementById("lege_filtru_infractiuni").style.display =
            this.value ? "flex" : "none";
        });
    } else {
      document.getElementById("gen_filtru_infractiuni").style.display = "none";
      document.getElementById("pedepse_filtru_infractiuni").style.display =
        "none";
    }
    resetButtons();
  });
