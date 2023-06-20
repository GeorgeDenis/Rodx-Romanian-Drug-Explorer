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

    let textboxes = document.querySelectorAll(".text-box"); // refresh textboxes

    if (arrow.classList.contains("arrow-left")) {
      targetIndex =
        currentIndex === 0 ? textboxes.length - 1 : currentIndex - 1;
    } else {
      targetIndex = (currentIndex + 1) % textboxes.length;
    }

    const targetTextBox = document.querySelector(
      `[data-index="${targetIndex + 1}"]`
    );

    currentTextBox.classList.add("hidden");
    targetTextBox.classList.remove("hidden");
  });
});
let allTextBoxes = Array.from(document.querySelectorAll(".text-box"));
async function getCampanii() {
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/campaign", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }
    return await response.json();
  };
  getData()
    .then((data) => {
      let divIndex = 7;

      const campaigns = data.campaigns;
      const parentElement = document.querySelector(".catalog");

      campaigns.forEach((campaign, index) => {
        const campaignElement = document.createElement("div");
        campaignElement.className = "rectangle glass";

        const titleElement = document.createElement("h3");
        titleElement.textContent = campaign.title;

        const contentElement = document.createElement("div");
        contentElement.className = "content";

        const imageElement = document.createElement("img");
        imageElement.src = "../public/poze/campanie6.jpg";

        const pElement = document.createElement("p");
        pElement.textContent = campaign.article.substring(0, 120) + "...";

        contentElement.appendChild(imageElement);
        contentElement.appendChild(pElement);

        const btnElement = document.createElement("div");
        btnElement.className = "btn";

        const readMoreElement = document.createElement("button");
        readMoreElement.className = "read-more";
        readMoreElement.textContent = "Read more";
        readMoreElement.dataset.index = index + divIndex;

        btnElement.appendChild(readMoreElement);

        campaignElement.appendChild(titleElement);
        campaignElement.appendChild(contentElement);
        campaignElement.appendChild(btnElement);

        parentElement.appendChild(campaignElement);
        attachButtonEvents(readMoreElement);
      });
      let textBoxContainer = document.querySelector("#text-box-container"); // Added this line

      campaigns.forEach((campaign, index) => {
        let textBox = document.createElement("div");
        let closeBtn = document.createElement("button");
        closeBtn.setAttribute("class", "close-modal");
        closeBtn.innerHTML = "&times;";
        closeBtn.dataset.index = divIndex + index;
        let img = document.createElement("img");
        let text = document.createElement("div");
        let p = document.createElement("p");
        let navigation = document.createElement("div");
        let arrowLeft = document.createElement("button");
        let arrowRight = document.createElement("button");

        textBox.setAttribute("class", "text-box hidden");
        textBox.setAttribute("id", `text-box-${divIndex + index}`);
        textBox.setAttribute("data-index", `${divIndex + index}`);
        closeBtn.setAttribute("class", "close-modal");
        closeBtn.innerHTML = "&times;";
        img.setAttribute("src", "../public/poze/campanie6.jpg");
        img.setAttribute("alt", `poza ${index}`);
        text.setAttribute("class", "text");
        p.setAttribute("id", "modal-text");
        p.innerText = campaign.article;
        navigation.setAttribute("class", "navigation");
        arrowLeft.setAttribute("class", "arrow arrow-left");
        arrowLeft.innerHTML = "&larr;";
        arrowRight.setAttribute("class", "arrow arrow-right");
        arrowRight.innerHTML = "&rarr;";

        navigation.appendChild(arrowLeft);
        navigation.appendChild(arrowRight);

        arrowLeft.addEventListener("click", navigate);
        arrowRight.addEventListener("click", navigate);
        text.appendChild(p);
        text.appendChild(navigation);
        textBox.appendChild(closeBtn);
        textBox.appendChild(img);
        textBox.appendChild(text);

        textBoxContainer.appendChild(textBox);
        attachCloseButtonEvents(closeBtn);

        allTextBoxes.push(textBox);
      });
      let buttons = document.querySelectorAll(".read-more");
      let btnClose = document.querySelectorAll(".close-modal");
      let textboxes = document.querySelectorAll(".text-box");
      allTextBoxes.forEach((textBox, index) => {
        // Attach navigation events to all text-box elements
        textBox
          .querySelector(".arrow-left")
          .addEventListener("click", function () {
            navigate(index, -1);
          });
        textBox
          .querySelector(".arrow-right")
          .addEventListener("click", function () {
            navigate(index, 1);
          });
      });

      // Gestionează evenimentul de închidere pentru toate text-box-urile
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          allTextBoxes.forEach((textBox) => {
            if (!textBox.classList.contains("hidden")) {
              textBox.classList.add("hidden");
              overlay.classList.add("hidden");
              body.classList.remove("no-scroll");
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function attachButtonEvents(button) {
  button.addEventListener("click", function () {
    let idOpen = "text-box-" + button.dataset.index;
    const textBox = document.getElementById(idOpen);
    textBox.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.classList.add("no-scroll");
  });
}

function attachCloseButtonEvents(button) {
  button.addEventListener("click", function () {
    let idClose = "text-box-" + button.dataset.index;
    const textBox = document.getElementById(idClose);
    textBox.classList.add("hidden");
    overlay.classList.add("hidden");
    body.classList.remove("no-scroll");
  });
}

function attachNavigationButtonEvents(button) {
  button.addEventListener("click", navigate);
}
function navigate(currentIndex, direction) {
  let targetIndex = currentIndex + direction;
  if (targetIndex < 0) targetIndex = allTextBoxes.length - 1;
  if (targetIndex >= allTextBoxes.length) targetIndex = 0;

  if (allTextBoxes[currentIndex]) {
    allTextBoxes[currentIndex].classList.add("hidden");
  }
  if (allTextBoxes[targetIndex]) {
    allTextBoxes[targetIndex].classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", getCampanii);
