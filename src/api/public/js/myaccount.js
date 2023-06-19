function attachSidebarLinkHandlers() {
  const sidebarLinks = document.querySelectorAll('.sidebar ul li');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidebarLinks.forEach(l => l.classList.remove('selected'));

      this.classList.add('selected');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });

      const contentId = this.textContent.trim().toLowerCase(); // Call trim() here
      const contentElement = document.getElementById(contentId);
    
      if (contentElement) {
        contentElement.style.display = 'block';
      }
    });
  });
}  



async function setAdmin()
{
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
        <li>
          Utilizatori
        </li>
        <li>
          Campanii
        </li>
      `;

  
      
  const logoutElement = document.getElementById("logout-button");
  logoutElement.insertAdjacentHTML("beforebegin", newElement);
  
  attachSidebarLinkHandlers();
     
    }


    let usernameInput = document.getElementById("username");
    usernameInput.value = data.data.name;

    let emailInput = document.getElementById("email");
    emailInput.value = data.data.email;

    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });

    document.getElementById('account').style.display = 'block';

  })
  .catch((error)=>{
    console.error(error)
  });
};
document.addEventListener("DOMContentLoaded", setAdmin);


async function populateUsersTable() {
  const tbody = document.querySelector("#usersTable tbody");

  try {
    const token = localStorage.getItem('token'); 
    const response = await fetch("http://localhost:3000/api/admin", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    tbody.innerHTML = ""; 

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
        
        const token = localStorage.getItem('token'); 

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
      attachSidebarLinkHandlers();

    });
  } catch (error) {
    console.error(error);
  }

}

document.addEventListener('DOMContentLoaded', populateUsersTable);
document.addEventListener('DOMContentLoaded', attachSidebarLinkHandlers);

const logout = document.getElementById("logout-button");

logout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "/";
});

//Mesaj pentru Update
function submitPasswordForm(e) {
  e.preventDefault();

  var oldPassword = document.getElementById('old-password').value;
  var newPassword = document.getElementById('new-password').value;
  var confirmPassword = document.getElementById('confirm-new-password').value;

  if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
    alert('Toate campurile trebuie completate!');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('Parolele nu se potrivesc!');
    return;
  }

  var successMessage = document.createElement('p');
  successMessage.textContent = '';
  successMessage.style.color = 'green';
  successMessage.id = 'success-message';
  document.body.appendChild(successMessage);

  window.setTimeout(function() {
    var message = document.getElementById('success-message');
    if (message) {
      message.style.display = 'none';
    }
  }, 5000);
}

document.querySelector('#password-form').addEventListener('submit', submitPasswordForm);

function submitAccountForm(e) {
  e.preventDefault();

  var newName = document.getElementById('username').value;
  var newEmail = document.getElementById('email').value;

  if (newName === '' || newEmail === '') {
    
    return;
  }

  // Creare mesaj de succes
  var successMessage = document.createElement('p');
  successMessage.textContent = '';
  successMessage.style.color = 'green';
  successMessage.id = 'success-message';
  document.body.appendChild(successMessage);

  // Setarea unei întârzieri de 5 secunde înainte de a ascunde mesajul
  window.setTimeout(function() {
    var message = document.getElementById('success-message');
    if (message) {
      message.style.display = 'none';
    }
  }, 5000);
}

document.querySelector('#update-account-form').addEventListener('submit', submitAccountForm);


