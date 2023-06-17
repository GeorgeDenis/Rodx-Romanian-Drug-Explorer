const logout = document.getElementById("logout-button");

logout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "/";
});

window.onload = async function () {
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

  getData().then((data) => {
    if (data.data.role === "admin") {
      const newElement = `
        <a class="nav-link" id="admin-tab" href="#admin" role="tab" aria-controls="admin">
          <i class="fa fa-user-shield text-center mr-1"></i> 
          Utilizatori
        </a>
        <a class="nav-link" id="admin-tab" href="#campanii" role="tab" aria-controls="admin">
          <i class="fa fa-user-shield text-center mr-1"></i> 
          Campanii
        </a>
      `;
      document
        .getElementById("history-tab")
        .insertAdjacentHTML("afterend", newElement);
    }
    let usernameInput = document.getElementById("username-input");
    usernameInput.value = data.data.name;

    let emailInput = document.getElementById("email-input");
    emailInput.value = data.data.email;
  });
};
