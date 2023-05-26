document
  .getElementById("search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Crearea obiectului
    var obj = {};

    // Obțineți valoarea selectată din categoria principală
    obj.categorieSelectValue =
      document.getElementById("categorie_select").value;

    // Obțineți valoarea selectată din selectul "Reprezentare"
    obj.reprezentareSelectValue = document.getElementById(
      "reprezentare_select"
    ).value;

    // Verificăm care categorie este selectată și obținem valorile din selectoarele respective
    if (obj.categorieSelectValue === "infractiuni") {
      var infractiuniSelects = document.querySelectorAll(
        "#infractiuni_options select"
      );
      obj.infractiuniValues = [];
      for (let i = 0; i < infractiuniSelects.length; i++) {
        // Verifică dacă valoarea este selectată în fiecare select
        if (infractiuniSelects[i].value === "") {
          alert("Toate câmpurile trebuie să fie selectate!");
          return;
        }
        obj.infractiuniValues.push(infractiuniSelects[i].value);
      }
    } else if (obj.categorieSelectValue === "confiscari") {
      var confiscariSelects = document.querySelectorAll(
        "#confiscari_options select"
      );
      obj.confiscariValues = [];
      for (let i = 0; i < confiscariSelects.length; i++) {
        // Verifică dacă valoarea este selectată în fiecare select
        if (confiscariSelects[i].value === "") {
          alert("Toate câmpurile trebuie să fie selectate!");
          return;
        }
        obj.confiscariValues.push(confiscariSelects[i].value);
      }
    } else if (obj.categorieSelectValue === "urgente_medicale") {
      var urgenteSelects = document.querySelectorAll("#urgente_options select");
      obj.urgenteValues = [];
      for (let i = 0; i < urgenteSelects.length; i++) {
        // Verifică dacă valoarea este selectată în fiecare select
        if (urgenteSelects[i].value === "") {
          alert("Toate câmpurile trebuie să fie selectate!");
          return;
        }
        obj.urgenteValues.push(urgenteSelects[i].value);
      }
    }

    // Conversia obiectului în JSON și afișarea în consolă
    console.log(JSON.stringify(obj, null, 2));
  });
