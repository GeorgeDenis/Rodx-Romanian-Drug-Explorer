const sidebarLinks = document.querySelectorAll('.sidebar ul li');
const allTabs = document.querySelectorAll('.nav-link');


sidebarLinks.forEach(link => {
  link.addEventListener('click', function() {
    sidebarLinks.forEach(l => l.classList.remove('selected'));

    this.classList.add('selected');

    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });

    const contentId = this.textContent.trim().toLowerCase(); 
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
      contentElement.style.display = 'block';
    }
  });
});

window.onload = function() {
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });

  document.getElementById('account').style.display = 'block';
};
