document
  .getElementById("categorie_select")
  .addEventListener("change", function () {
    // Ascunde toate grupele de selectoare
    document.getElementById("infractiuni_options").style.display = "none";
    document.getElementById("confiscari_options").style.display = "none";
    document.getElementById("urgente_options").style.display = "none";

    // Afiseaza grupul de selectoare specific categoriei selectate
    if (this.value === "infractiuni") {
      document.getElementById("infractiuni_options").style.display = "flex";
    } else if (this.value === "confiscari") {
      document.getElementById("confiscari_options").style.display = "flex";
    } else if (this.value === "urgente") {
      document.getElementById("urgente_options").style.display = "flex";
    }
  });
//   document.getElementById('urgente_filtru').addEventListener('change', function() {
//     // ascunde toate selectoarele suplimentare
//     document.getElementById('gen_filtru').style.display = 'none';
//     document.getElementById('varsta_filtru').style.display = 'none';
//     document.getElementById('administrare_filtru').style.display = 'none';

//     // arata selectorul corespunzator optiunii alese
//     if (this.value === 'Gen') {
//         document.getElementById('gen_filtru').style.display = 'flex';
//     } else if (this.value === 'Varsta') {
//         document.getElementById('varsta_filtru').style.display = 'flex';
//     } else if (this.value === 'Administrare') {
//         document.getElementById('administrare_filtru').style.display = 'flex';
//     }
// });
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
});
