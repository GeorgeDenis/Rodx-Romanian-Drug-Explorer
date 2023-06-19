const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const form = document.getElementById('campaignForm');

addBtn.disabled = true;


uploadBtn.addEventListener('click', function() {
  fileInput.click();
});

fileInput.addEventListener('change', function() {
  form.dataset.file = this.files[0];
  
  // Once a file is selected, disable the upload button and show the check mark
  uploadBtn.disabled = true;
  document.getElementById('checkMark').style.display = 'inline';
  [title, article].forEach(input => {
    input.addEventListener('input', function() {
        addBtn.disabled = !title.value || !article.value;
    });
}); 
});
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const fileInput = document.getElementById("fileInput");
  const articleInput = document.getElementById("article");
  const titleInput = document.getElementById("title");
  
  const uploadedImage = fileInput.files[0];
  const article = articleInput.value;
  const title = titleInput.value;
  
 
  const formData = new FormData();
  formData.append("photo", uploadedImage);
  formData.append("article", article);
  formData.append("title", title);
  
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
    });
});