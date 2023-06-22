const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login-link");
const register = document.querySelector(".login-register");

register.addEventListener("click", () => {
  wrapper.classList.add("active");
});
login.addEventListener("click", () => {
  wrapper.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.querySelector(".email-input input");

  emailInput.addEventListener("input", function () {
    if (emailInput.validity.valid) {
      emailInput.parentElement.classList.remove("invalid");
    } else {
      emailInput.parentElement.classList.add("invalid");
    }
  });
});
