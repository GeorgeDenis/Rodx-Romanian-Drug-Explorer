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
};
