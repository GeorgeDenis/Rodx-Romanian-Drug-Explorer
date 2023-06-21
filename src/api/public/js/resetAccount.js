document
  .getElementById("update-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    fetch("http://localhost:3000/api/auth/changeAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        newName: username,
        newEmail: email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("An error occurred");
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        repopulateData();
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });
async function repopulateData() {
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/users/self", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      window.location.href = "/login";
      return;
    }
    return await response.json();
  };
  getData()
    .then((data) => {
      let usernameInput = document.getElementById("username");
      usernameInput.value = data.data.name;

      let emailInput = document.getElementById("email");
      emailInput.value = data.data.email;

      document.querySelectorAll(".tab-content").forEach((content) => {
        content.style.display = "none";
      });

      document.getElementById("account").style.display = "block";
    })
    .catch((error) => {
      console.error(error);
    });
}
