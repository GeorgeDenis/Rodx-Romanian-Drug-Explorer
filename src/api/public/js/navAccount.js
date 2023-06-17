// Select all the tab links
const tabs = document.querySelectorAll('.nav-link');

tabs.forEach(tab => {
// Add click event to each tab
tab.addEventListener('click', function(event) {
    // Prevent the default action
    event.preventDefault();

    // Remove 'active' class from all tabs and panes
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));

    // Add 'active' class to clicked tab and corresponding pane
    this.classList.add('active');
    document.querySelector(this.getAttribute('href')).classList.add('show', 'active');
});
});

// Set the initial tab
if (window.location.hash) {
// If there's a hash in the URL (someone could have linked directly to a specific tab), simulate a click on the corresponding tab
const tabWithHash = document.querySelector(`.nav-link[href="${window.location.hash}"]`);
if (tabWithHash) {
    tabWithHash.click();
} else {
    // If there's no tab corresponding to the hash, simulate a click on the first tab
    tabs[0].click();
}
} else {
// If there's no hash, simulate a click on the first tab
tabs[0].click();
}