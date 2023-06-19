document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

  
    fetch('http://localhost:3000/api/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert(data.message);
        console.log('Parola a fost schimbată cu succes');
      } else {
        
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error('A apărut o eroare:', error);
    });
  });
  document.getElementById('update-password-button').addEventListener('click', function(event) {
    document.querySelector('#passwordChangeForm').submit();
});