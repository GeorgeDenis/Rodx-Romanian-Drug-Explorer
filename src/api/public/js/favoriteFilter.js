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
const deleteFilter = async (id, type) => {
  const token = localStorage.getItem("token");
  const url = `http://localhost:3000/api/filter/${type}/favorite/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
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

    getFilters(
      `http://localhost:3000/api/filter/${type}/favorite`,
      `${type}Filters`
    );
  } catch (error) {
    console.log("An error occurred:", error);
  }
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
    filtersContainer.innerHTML = "";

    data.data.forEach((filter, index) => {
      const button = document.createElement("button");
      button.textContent = `Filtru ${index + 1}`;
      button.classList.add("myButton");
      button.addEventListener("click", () => {
        localStorage.setItem(containerId, JSON.stringify({ data: [filter] }));
        window.location.href = "/cautare";
      });

      const deleteSpan = document.createElement("span");
      deleteSpan.className = "material-symbols-outlined";
      deleteSpan.textContent = "delete";
      deleteSpan.dataset.id = filter.id;
      deleteSpan.addEventListener("click", () => {
        deleteFilter(deleteSpan.dataset.id, filter.categorie_select);
      });

      const filterContainer = document.createElement("div");
      filterContainer.className = "filter-container";
      filterContainer.appendChild(button);
      filterContainer.appendChild(deleteSpan);

      filtersContainer.appendChild(filterContainer);
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
