document
  .getElementById("password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const oldPasswordInput = document.getElementById("old-password");
    const newPasswordInput = document.getElementById("new-password");
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;

    fetch("http://localhost:3000/api/auth/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
          console.log("Parola a fost schimbată cu succes");

          oldPasswordInput.value = '';
          newPasswordInput.value = '';

        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("A apărut o eroare:", error);
      });
  });
