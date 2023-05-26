/* Butoanele ReadMore si Close text-box*/
const buttons = document.querySelectorAll(".read-more");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelectorAll(".close-modal");
const body = document.querySelector("body");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let idOpen = "text-box-" + String(i + 1);
    const textBox = document.getElementById(idOpen);
    textBox.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.classList.add("no-scroll");
  });
}
console.log(btnClose);
for (let j = 0; j < btnClose.length; j++) {
  btnClose[j].addEventListener("click", function () {
    let idClose = "text-box-" + String(j + 1);

    const textBox = document.getElementById(idClose);
    textBox.classList.add("hidden");
    overlay.classList.add("hidden");
    body.classList.remove("no-scroll");
  });
}
document.addEventListener("keydown", function (e) {
  for (let i = 0; i < buttons.length; i++) {
    let idOpen = "text-box-" + String(i + 1);
    const textBox = document.getElementById(idOpen);
    if (e.key === "Escape" && !textBox.classList.contains("hidden")) {
      textBox.classList.add("hidden");
      overlay.classList.add("hidden");
      body.classList.remove("no-scroll");
    }
  }
});
/*----------------------------------------------------------*/

const arrowButtons = document.querySelectorAll(".arrow");
arrowButtons.forEach((arrow) => {
  arrow.addEventListener("click", function () {
    const currentTextBox = arrow.closest(".text-box");
    const currentIndex = parseInt(currentTextBox.dataset.index) - 1;
    let targetIndex;

    if (arrow.classList.contains("arrow-left")) {
      targetIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
    } else {
      targetIndex = (currentIndex + 1) % buttons.length;
    }

    const targetTextBox = document.querySelector(
      `[data-index="${targetIndex + 1}"]`
    );

    currentTextBox.classList.add("hidden");
    targetTextBox.classList.remove("hidden");
  });
});
