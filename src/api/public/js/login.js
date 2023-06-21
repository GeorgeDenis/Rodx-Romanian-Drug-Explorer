const wrapper = document.querySelector(".wrapper");
const loginLinks = document.querySelectorAll(".login-link");
const registerLinks = document.querySelectorAll(".register-link");
const forgotPasswordLink = document.querySelector(".forgot a");
const forgotPasswordForm = document.querySelector(".forgot-password");

const loginForm = document.querySelector(".form-box.login");
const registerForm = document.querySelector(".form-box.register");
registerLinks.forEach(register => {console.log("SALUT");
console.log("SALUT1");  
register.addEventListener("click", () => {
     wrapper.classList.add("active");
    hideForgotPasswordForm();
  });
});

loginLinks.forEach(login => {
  console.log("SALUT2");
  login.addEventListener("click", () => {
    wrapper.classList.remove("active");
    hideForgotPasswordForm();
  });
});


forgotPasswordLink.addEventListener("click", function(event) {
  
  event.preventDefault();
  console.log("SALUT3");
  // Ascunde formularul de login și de înregistrare
  hideLoginFormAndRegisterForm();

  // Arată formularul de resetare a parolei
  forgotPasswordForm.style.display = "block";
});

function hideForgotPasswordForm() {
  // Ascundem formularul de resetare a parolei
  forgotPasswordForm.style.display = "none";
  console.log("SALUT4");
  // Reafișăm formularul de login și de înregistrare
  showLoginFormAndRegisterForm();
}

function hideLoginFormAndRegisterForm() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
  console.log("SALUT5");
}

function showLoginFormAndRegisterForm() {
  loginForm.style.display = 'block';
  registerForm.style.display = 'block';
  console.log("SALUT6");
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("SALUT7");
  const emailInput = document.querySelector(".email-input input");

  emailInput.addEventListener("input", function () {
    if (emailInput.validity.valid) {
      emailInput.parentElement.classList.remove("invalid");
    } else {
      emailInput.parentElement.classList.add("invalid");
    }
  });
});
