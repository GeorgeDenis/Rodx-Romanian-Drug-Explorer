var counter = 1;
var manualBtns = document.querySelectorAll('.manual-btn');

function activateButton(index) {
  for (var i = 0; i < manualBtns.length; i++) {
    if (i === index) {
      manualBtns[i].classList.add('active');
    } else {
      manualBtns[i].classList.remove('active');
    }
  }
}

function switchSlide() {
  document.getElementById('radio' + counter).checked = true;
  activateButton(counter - 1);
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}

// Call switchSlide() immediately after defining it
switchSlide();

setInterval(switchSlide, 5000);

for (var i = 0; i < manualBtns.length; i++) {
  manualBtns[i].addEventListener('click', function() {
    var index = Array.prototype.indexOf.call(manualBtns, this);
    counter = index + 1;
    switchSlide();
  });
}
const hamburger = document.querySelector('.hamburger');
const mobile_menu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click',function() {
    this.classList.toggle('is-active');
    mobile_menu.classList.toggle('is-open');
});
