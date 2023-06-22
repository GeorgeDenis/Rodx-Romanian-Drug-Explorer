document.getElementById('SchimbaParola').addEventListener('click', function(event) {
  event.preventDefault();

    let parts = window.location.href.split('/');
    let lastPart = parts.pop();
    let password = document.getElementById('parola').value;
    let confirmPassword = document.getElementById('parolaConfirmare').value;

    if(password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    fetch(`/api/auth/resetPassword/${lastPart}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        token: lastPart 
      })
    })
    .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        window.location.href = "/login";
      })
      .catch(error => console.log('Error:', error));
  });