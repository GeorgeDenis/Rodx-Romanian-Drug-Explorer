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
    } else if (this.value === "urgente_medicale") {
      document.getElementById("urgente_options").style.display = "flex";
    }
  });
