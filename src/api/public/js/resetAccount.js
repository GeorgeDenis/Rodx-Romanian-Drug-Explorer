document.getElementById('update-account-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  fetch('http://localhost:3000/api/auth/changeAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({
    newName: username,
    newEmail: email
  })
}).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('An error occurred');
  }
}).then(data => {
  if (data.token) {
    //salvam noul token in local storage
    localStorage.setItem('token', data.token);
  }
  alert(data.message);
}).catch(error => {
  console.error('Error:', error);
  alert('An error occurred. Please try again.');
});
});
