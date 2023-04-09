let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.StopDrugs');
let header = document.querySelector('header');

window.addEventListener('DOMContentLoaded', () => {
  const myVideo = document.getElementById('my-video');
  const intro = document.querySelector('.intro');
  const logoSpan = document.querySelectorAll('.StopDrugs');

  myVideo.play();

  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50);
      });

      setTimeout(() => {
        intro.style.top = '-100vh';
        header.classList.add('header-visible');
        myVideo.pause();
        myVideo.currentTime = 0;
      }, 1000);
    }, 4000);

    setTimeout(() => {
      myVideo.addEventListener('ended', () => {
        myVideo.style.display = 'none';
      });
    }, 15000);

  });
});