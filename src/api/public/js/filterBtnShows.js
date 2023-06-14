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
  document.getElementById('urgente_filtru').addEventListener('change', function() {
    // ascunde toate selectoarele suplimentare
    document.getElementById('gen_filtru').style.display = 'none';
    document.getElementById('varsta_filtru').style.display = 'none';
    document.getElementById('administrare_filtru').style.display = 'none';

    // arata selectorul corespunzator optiunii alese
    if (this.value === 'Gen') {
        document.getElementById('gen_filtru').style.display = 'flex';
    } else if (this.value === 'Varsta') {
        document.getElementById('varsta_filtru').style.display = 'flex';
    } else if (this.value === 'Administrare') {
        document.getElementById('administrare_filtru').style.display = 'flex';
    }
});

