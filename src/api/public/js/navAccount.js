// Selectezi toate link-urile din sidebar
const sidebarLinks = document.querySelectorAll('.sidebar ul li');

sidebarLinks.forEach(link => {
  // Adaugi un event listener pentru click pe fiecare link
  link.addEventListener('click', function() {
    // Elimini clasa 'selected' de la toate link-urile
    sidebarLinks.forEach(l => l.classList.remove('selected'));

    // Adaugi clasa 'selected' la link-ul pe care s-a dat click
    this.classList.add('selected');

    // Ascunzi toate secțiunile
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });

    // Afisezi secțiunea corespunzătoare link-ului pe care s-a dat click
    const contentId = this.textContent.toLowerCase();
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
      contentElement.style.display = 'block';
    }

    // Daca s-a dat click pe logout, ștergi token-ul din local storage
    
   
  });
});
window.onload = function() {
  // Ascunzi toate secțiunile
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });

  // Afisezi secțiunea 'account' la încărcarea paginii
  document.getElementById('account').style.display = 'block';
};
