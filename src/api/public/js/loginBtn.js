document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-box.login form");
  const registerForm = document.querySelector(".form-box.register form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = loginForm.querySelector(".email-input input");
    const passwordInput = loginForm.querySelector('input[type="password"]');

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then((data) => {
        if (data.status !== 200) {
          throw new Error(data.body.message || "Unknown error");
        }

        console.log("Success:", data.body.message);
        localStorage.setItem("token", data.body.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = registerForm.querySelector('input[type="text"]');
    const emailInput = registerForm.querySelector(".email-input input");
    const passwordInputs = registerForm.querySelectorAll(
      'input[type="password"]'
    );

    if (passwordInputs[0].value !== passwordInputs[1].value) {
      console.error("Parolele nu coincid.");
      return;
    }

    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInputs[0].value,
      }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({ status: response.status, body: data }))
      )
      .then((data) => {
        if (data.status !== 201) {
          throw new Error(data.body.message || "Unknown error");
        }
        console.log("Success:", data);
        localStorage.setItem("token", data.body.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
});
