const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const form = document.getElementById("campaignForm");
const addBtn = document.getElementById("addBtn");
const articleInput = document.getElementById("article");
const titleInput = document.getElementById("title");

addBtn.disabled = true;

function checkInputs() {
  addBtn.disabled =
    !titleInput.value || !articleInput.value || !fileInput.files.length;
}

[titleInput, articleInput, fileInput].forEach((input) => {
  input.addEventListener("input", checkInputs);
});

uploadBtn.addEventListener("click", function () {
  fileInput.click();
});

fileInput.addEventListener("change", function () {
  form.dataset.file = this.files[0];

  uploadBtn.disabled = true;
  document.getElementById("checkMark").style.display = "inline";
  checkInputs();
});
const deleteDrop = document.getElementById("deleteDropdown");
function fetchCampaigns() {
  deleteDrop.innerHTML = "";

  fetch("/api/campaign", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      json.campaigns.forEach((campaign) => {
        const option = document.createElement("option");
        option.value = campaign.id;
        option.innerText = campaign.title;
        deleteDrop.appendChild(option);
      });
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const uploadedImage = fileInput.files[0];
  const article = articleInput.value.trim();
  const title = titleInput.value.trim();

  if (!uploadedImage || article === "" || title === "") {
    alert("Toate câmpurile trebuie completate!");
    return;
  }

  const formData = new FormData();
  formData.append("photo", uploadedImage);
  formData.append("article", article);
  formData.append("title", title);
  document.getElementById("checkMark").style.display = "none";
  uploadBtn.disabled = false;
  fetch("/api/campaign", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => {
      var obj = JSON.parse(JSON.stringify(json));
      alert(obj.message);
      fetchCampaigns();
      fileInput.value = "";
      articleInput.value = "";
      titleInput.value = "";
    });
});
