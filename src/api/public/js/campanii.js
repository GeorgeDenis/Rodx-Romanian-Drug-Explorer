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
  console.log("peste");

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
      const campaigns = data.campaigns;
      const parentElement = document.querySelector(".catalog"); // change ".articles-container" to the class name or id of your container

      campaigns.forEach((campaign) => {
        const rectangleDiv = document.createElement("div");
        rectangleDiv.className = "rectangle glass";

        const h3 = document.createElement("h3");
        h3.textContent = campaign.title;

        const contentDiv = document.createElement("div");
        contentDiv.className = "catalog";

        const img = document.createElement("img");
        img.src = campaign.image;
        img.alt = "campaign image";

        const p = document.createElement("p");
        p.textContent = campaign.shortText;

        contentDiv.appendChild(img);
        contentDiv.appendChild(p);

        const btnDiv = document.createElement("div");
        btnDiv.className = "btn";

        const button = document.createElement("button");
        button.className = "read-more";
        button.textContent = "Read more";

        button.addEventListener('click', function() {
          const modalText = document.querySelector('#modal-text');
          modalText.textContent = campaign.article;
  
          const textBox = document.querySelector(".text-box");
          textBox.classList.remove("hidden");
          overlay.classList.remove("hidden");
          body.classList.add("no-scroll");
        });

        btnDiv.appendChild(button);
        
        rectangleDiv.appendChild(h3);
        rectangleDiv.appendChild(contentDiv);
        rectangleDiv.appendChild(btnDiv);

        parentElement.appendChild(rectangleDiv);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", getCampanii);

let currentIndex = 0;
const textboxes = document.querySelectorAll('.text-box'); 

function showSlide(index) {
  textboxes.forEach((box, i) => {
    if (i === index) {
      box.classList.remove('hidden');
    } else {
      box.classList.add('hidden');
    }
  });
}
