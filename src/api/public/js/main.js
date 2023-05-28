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
  if (token) {
    loginLink.textContent = "MyAccount";
    loginLink.href = "myaccount";

    mobileLoginLink.textContent = "MyAccount";
    mobileLoginLink.href = "myaccount";
  }
};
