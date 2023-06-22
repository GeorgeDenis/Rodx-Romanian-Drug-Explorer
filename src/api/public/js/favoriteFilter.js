const emptyOtherFilters = (excludeId) => {
  const filterContainerIds = [
    "confiscariFilters",
    "infractiuniFilters",
    "urgenteFilters",
  ];
  filterContainerIds
    .filter((id) => id !== excludeId)
    .forEach((id) => (document.getElementById(id).innerHTML = ""));
};
const getFilters = async (url, containerId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
      return;
    }

    const data = await response.json();

    const filtersContainer = document.getElementById(containerId);
    filtersContainer.innerHTML = ""; // Clear the filters container

    data.data.forEach((filter, index) => {
      const button = document.createElement("button");
      button.textContent = `Filtru ${index + 1}`;
      button.classList.add("myButton");
      button.addEventListener("click", () => {
        localStorage.setItem(containerId, JSON.stringify({ data: [filter] }));
        window.location.href = "/cautare";
      });

      filtersContainer.appendChild(button);
    });
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

document
  .getElementById("loadConfiscariFilters")
  .addEventListener("click", () => {
    emptyOtherFilters("confiscariFilters");
    getFilters(
      "http://localhost:3000/api/filter/confiscari/favorite",
      "confiscariFilters"
    );
  });

document
  .getElementById("loadInfractiuniFilters")
  .addEventListener("click", () => {
    emptyOtherFilters("infractiuniFilters");
    getFilters(
      "http://localhost:3000/api/filter/infractiuni/favorite",
      "infractiuniFilters"
    );
  });

document.getElementById("loadUrgenteFilters").addEventListener("click", () => {
  emptyOtherFilters("urgenteFilters");
  getFilters(
    "http://localhost:3000/api/filter/urgente/favorite",
    "urgenteFilters"
  );
});
