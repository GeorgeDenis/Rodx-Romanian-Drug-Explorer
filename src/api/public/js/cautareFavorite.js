const hamburger = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-menu");
const loginLink = document.querySelector(".menu #login-link");
const mobileLoginLink = document.querySelector(".mobile-menu #login-link");

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-open");
});
window.onload = function () {
  const token = localStorage.getItem("token");
  const loginLink = document.querySelector(".menu #login-link");
  const mobileLoginLink = document.querySelector(".mobile-menu #login-link");

  if (token) {
    if (loginLink) {
      loginLink.textContent = "MyAccount";
      loginLink.href = "myaccount";
    }

    if (mobileLoginLink) {
      mobileLoginLink.textContent = "MyAccount";
      mobileLoginLink.href = "myaccount";
    }
  }
  const data =
    JSON.parse(localStorage.getItem("confiscariFilters")) ||
    JSON.parse(localStorage.getItem("infractiuniFilters")) ||
    JSON.parse(localStorage.getItem("urgenteFilters"));
  if (data) {
    if (data.data[0].categorie_select === "confiscari") {
      document.getElementById("categorie_select").value =
        data.data[0].categorie_select;
      document.getElementById("reprezentare_select").value =
        data.data[0].reprezentare;
      document.getElementById("confiscari_options").style.display = "flex";
      document.getElementById("confiscari_subcategorie").value =
        data.data[0].confiscari_subcategorie;
      document.getElementById("startYearConfiscari").value =
        data.data[0].startyearconfiscari;

      populateEndYearConfiscari(data.data[0].startyearconfiscari);

      document.getElementById("endYearConfiscari").value =
        data.data[0].endyearconfiscari;
      document.getElementById("drog").value = data.data[0].drog;
    } else if (data.data[0].categorie_select === "infractiuni") {
      console.log("Received data:", data.data[0]);
      document.getElementById("categorie_select").value =
        data.data[0].categorie_select;
      document.getElementById("reprezentare_select").value =
        data.data[0].reprezentare;
      document.getElementById("infractiuni_options").style.display = "flex";
      document.getElementById("infractiuni_categorie").value =
        data.data[0].infractiuni_categorie;
      document.getElementById("startYearInfractiuni").value =
        data.data[0].startyearinfractiuni;
      populateEndYearInfractiuni(data.data[0].startyearinfractiuni);
      document.getElementById("endYearInfractiuni").value =
        data.data[0].endyearinfractiuni;
      if (data.data[0].cercetari_filtru_infractiuni) {
        document.getElementById("cercetari_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("cercetari_filtru_infractiuni").value =
          data.data[0].cercetari_filtru_infractiuni;
      } else if (data.data[0].incadrare_filtru_infractiuni) {
        document.getElementById("incadrare_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("incadrare_filtru_infractiuni").value =
          data.data[0].incadrare_filtru_infractiuni;
      } else if (data.data[0].grupari_filtru_infractiuni) {
        document.getElementById("grupari_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("grupari_filtru_infractiuni").value =
          data.data[0].grupari_filtru_infractiuni;
      } else if (data.data[0].pedepse_filtru_infractiuni) {
        document.getElementById("pedepse_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("pedepse_filtru_infractiuni").value =
          data.data[0].pedepse_filtru_infractiuni;
        document.getElementById("lege_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("lege_filtru_infractiuni").value =
          data.data[0].lege_filtru_infractiuni;
      } else if (data.data[0].gen_filtru_infractiuni) {
        document.getElementById("gen_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("gen_filtru_infractiuni").value =
          data.data[0].gen_filtru_infractiuni;
        document.getElementById("varsta_filtru_infractiuni").style.display =
          "flex";
        document.getElementById("varsta_filtru_infractiuni").value =
          data.data[0].varsta_filtru_infractiuni;
      }
    } else if (data.data[0].categorie_select === "urgente") {
      document.getElementById("categorie_select").value =
        data.data[0].categorie_select;
      document.getElementById("reprezentare_select").value =
        data.data[0].reprezentare;
      document.getElementById("urgente_options").style.display = "flex";
      document.getElementById("urgente_an").value = data.data[0].urgente_an;
      document.getElementById("urgente_drog").value = data.data[0].urgente_drog;
      document.getElementById("urgente_filtru").value =
        data.data[0].urgente_filtru;
      if (data.data[0].urgente_an === "Interval") {
        let startYearSelect = document.createElement("select");
        startYearSelect.id = "startYear";
        startYearSelect.classList.add("filter-select");
        startYearSelect.innerHTML = `
            <option value="" disabled selected>An început</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          `;

        let endYearSelect = document.createElement("select");
        endYearSelect.id = "endYear";
        endYearSelect.classList.add("filter-select");
        endYearSelect.innerHTML =
          '<option value="" disabled selected>An sfârșit</option>';

        let selectElement = document.getElementById("urgente_an");
        selectElement.insertAdjacentElement("afterend", startYearSelect);
        startYearSelect.insertAdjacentElement("afterend", endYearSelect);

        document.getElementById("startYear").value = data.data[0].startyear;
        populateEndYearUrgente(data.data[0].startyear);
        document.getElementById("endYear").value = data.data[0].endyear;
      }
      if (data.data[0].varsta_filtru) {
        document.getElementById("varsta_filtru").style.display = "flex";
        document.getElementById("varsta_filtru").value =
          data.data[0].varsta_filtru;
      }
      if (data.data[0].administrare_filtru) {
        document.getElementById("administrare_filtru").style.display = "flex";
        document.getElementById("administrare_filtru").value =
          data.data[0].administrare_filtru;
      }
      if (data.data[0].consum_filtru) {
        document.getElementById("consum_filtru").style.display = "flex";
        document.getElementById("consum_filtru").value =
          data.data[0].consum_filtru;
      }
      if (data.data[0].gen_filtru) {
        document.getElementById("gen_filtru").style.display = "flex";
        document.getElementById("gen_filtru").value = data.data[0].gen_filtru;
      }
      if (data.data[0].diagnostic_filtru) {
        document.getElementById("diagnostic_filtru").style.display = "flex";
        document.getElementById("diagnostic_filtru").value =
          data.data[0].diagnostic_filtru;
      }
    }

    localStorage.removeItem("confiscariFilters");
    localStorage.removeItem("infractiuniFilters");
    localStorage.removeItem("urgenteFilters");
  }
};
function populateEndYearConfiscari(startYear) {
  let startYearInt = parseInt(startYear);
  let endYearSelect = document.getElementById("endYearConfiscari");
  let endYearOptions = "";
  for (let i = startYearInt + 1; i <= 2022; i++) {
    endYearOptions += `<option value="${i}">${i}</option>`;
  }
  endYearSelect.innerHTML =
    `<option value="" disabled selected>An sfârșit</option>` + endYearOptions;
}
function populateEndYearInfractiuni(startYear) {
  let startYearInt = parseInt(startYear);
  let endYearSelect = document.getElementById("endYearInfractiuni");
  let endYearOptions = "";
  for (let i = startYearInt + 1; i <= 2022; i++) {
    endYearOptions += `<option value="${i}">${i}</option>`;
  }
  endYearSelect.innerHTML =
    `<option value="" disabled selected>An sfârșit</option>` + endYearOptions;
}
function populateEndYearUrgente(startYear) {
  let startYearInt = parseInt(startYear);
  let endYearSelect = document.getElementById("endYear");
  let endYearOptions = "";
  for (let i = startYearInt + 1; i <= 2022; i++) {
    endYearOptions += `<option value="${i}">${i}</option>`;
  }
  endYearSelect.innerHTML =
    `<option value="" disabled selected>An sfârșit</option>` + endYearOptions;
}
