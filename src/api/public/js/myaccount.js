const logout = document.getElementById("logout-button");

logout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "/";
});
