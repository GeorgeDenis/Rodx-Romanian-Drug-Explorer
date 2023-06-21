document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-box.login form");
  const registerForm = document.querySelector(".form-box.register form");
  const resetRequestForm = document.querySelector(".form-box.reset-request form");
  const resetPasswordForm = document.querySelector(".form-box.reset-password form");


  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = loginForm.querySelector(".email-input input");
    const passwordInput = loginForm.querySelector('input[type="password"]');
    console.log("salut8");
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
    console.log("salut9");
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
  resetRequestForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("salut10");
    const emailInput = resetRequestForm.querySelector(".email-input input");
    fetch("http://localhost:3000/api/auth/resetPasswordRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
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
        alert("Un email a fost trimis cu instrucțiuni de resetare a parolei.")
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });

  resetPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("salut11");
    const tokenInput = resetPasswordForm.querySelector('input[type="text"]');
    const passwordInputs = resetPasswordForm.querySelectorAll(
      'input[type="password"]'
    );

    if (passwordInputs[0].value !== passwordInputs[1].value) {
      console.error("Parolele nu coincid.");
      return;
    }

    fetch(`http://localhost:3000/api/auth/resetPassword/${tokenInput.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordInputs[0].value,
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
        alert("Parola a fost resetată cu succes. Te poți autentifica cu noua parolă.");
        window.location.href = "/login";
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
});
