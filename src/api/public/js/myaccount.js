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
        <a class="nav-link" id="utilizatori-tab" data-tab="pill" href="#utilizatori" role="tab" aria-controls="utilizatori">
          <i class="fa fa-user-shield text-center mr-1"></i> 
          Utilizatori
        </a>
        <a class="nav-link" id="admin-campanii-tab" data-tab="pill" href="#campanii" role="tab" aria-controls="admin">
        <i class="fa fa-user-shield text-center mr-1"></i> 
        Campanii
      </a>
    `;
      document
        .getElementById("history-tab")
        .insertAdjacentHTML("afterend", newElement);
        
        const tabs = document.querySelectorAll('.nav-link');
        tabs.forEach(tab => {
          tab.addEventListener('click', function(event) {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
            this.classList.add('active');
            document.querySelector(this.getAttribute('href')).classList.add('show', 'active');
          });
        });
      }
   
   
      let usernameInput = document.getElementById("username-input");
    usernameInput.value = data.data.name;

    let emailInput = document.getElementById("email-input");
    emailInput.value = data.data.email;
  });
};
document.addEventListener('DOMContentLoaded', populateUsersTable);

async function populateUsersTable() {
  const tbody = document.querySelector("#usersTable tbody");

  try {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    const response = await fetch("http://localhost:3000/api/admin", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // This is how you include the token in your request
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    tbody.innerHTML = ""; // Clear existing table rows before populating

    users.data.forEach(user => {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      const nameCell = document.createElement("td");
     
      const deleteCell = document.createElement("td");

      idCell.textContent = user.user_id;
      nameCell.textContent = user.name;


      const deleteSpan = document.createElement("span");
      deleteSpan.className = "material-symbols-outlined";
      deleteSpan.textContent = "delete";
     
      deleteSpan.addEventListener("click", async function () {
        console.log(user.email);
        
        const token = localStorage.getItem('token'); // Or wherever you store your token

        let response =  await fetch("http://localhost:3000/api/admin", {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: user.email })
        });
    

        if (!response.ok) {
          alert("Error: Could not delete entry.");
        } else {
          row.parentNode.removeChild(row);
        }
      });
      
      deleteSpan.style.color = "red";
      deleteCell.appendChild(deleteSpan);

      row.appendChild(idCell);
      row.appendChild(nameCell);

      row.appendChild(deleteCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', populateUsersTable);
