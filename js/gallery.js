let popupImageContainer = document.querySelector(".popup-image-container");
let popupContainer = document.querySelector(".popup-container");
let popupBackground = popupContainer.querySelector(".popup-background");
let popupButtons = popupContainer.querySelector(".popup-buttons");
let popupButtonPrev = popupButtons.querySelector(".lightbox-button-prev");
let popupButtonNext = popupButtons.querySelector(".lightbox-button-next");

let popupOpened = false;
let currentIndex = null;

let imgItems = document.querySelectorAll(".gallery-item");
let imgHrefs = [];
imgItems.forEach(link => { imgHrefs.push(link.href); });

function showOpeningAnimation(linkToFullsizeImage, boundingRect) {
  popupContainer.classList.add("popup-container--opened");
  popupImageContainer.innerHTML = `
    <img class="popup-image popup-image--opening" src=${linkToFullsizeImage} alt="Popup image" style="
  position: absolute;
  top: ${boundingRect.top}px;
  left: ${boundingRect.left}px;
  width: ${boundingRect.width}px;
  height: ${boundingRect.height}px;
  ">`;
}

function openPopup(linkToFullsizeImage) {
  popupOpened = true;
  popupImageContainer.innerHTML = `<img class="popup-image" src=${linkToFullsizeImage} alt="full image">`
  currentIndex = imgHrefs.findIndex(curLink => curLink == linkToFullsizeImage);
  popupContainer.classList.add("popup-container--opened");
  popupBackground.classList.add("popup-background--opened");
  popupButtonPrev.innerHTML = `<img class="lightbox-button-prev-image--opened") src="/src/img/png/arrow-left.png" alt="Left arrow">`
  popupButtonNext.innerHTML = `<img class="lightbox-button-next-image--opened") src="/src/img/png/arrow-right.png" alt="Right arrow">`
}

function closePopup() {
  popupOpened = false;
  popupImageContainer.innerHTML = "";
  currentIndex = null;
  popupContainer.classList.remove("popup-container--opened");
  popupBackground.classList.remove("popup-background--opened");
  popupButtonPrev.innerHTML = "";
  popupButtonNext.innerHTML = "";
}

function switchPopupImage(step) {
  if (currentIndex == null) {
    return;
  }
  imgHrefsLength = imgHrefs.length;
  currentIndex = currentIndex + step;
  if (currentIndex < 0) {
    currentIndex += imgHrefsLength;
  }
  if (currentIndex >= imgHrefsLength) {
    currentIndex -= imgHrefsLength;
  }
  currentIndex = currentIndex;
  let currentLink = imgHrefs[currentIndex];
  openPopup(currentLink);
}

function nextPopupImage() {
  switchPopupImage(1);
}

function previousPopupImage() {
  switchPopupImage(-1);
}

imgItems.forEach(
  link => {
    link.addEventListener('click', async function (event) {
      event.preventDefault();
      let image = link.querySelector('img');
      let linkToFullsizeImage = event.currentTarget.href;
      let boundingRect = image.getBoundingClientRect();
      showOpeningAnimation(linkToFullsizeImage, boundingRect);
      await new Promise(_ => setTimeout(_, 1000));
      openPopup(linkToFullsizeImage);
    })
  }
);

document.addEventListener('keydown', event => {
  let keyName = event.key;
  if (popupOpened) {
    switch (keyName) {
      case "Escape":
        closePopup();
        break;
      case "ArrowRight":
      case "l":
        nextPopupImage();
        break;
      case "ArrowLeft":
      case "h":
        previousPopupImage();
        break
    }
  }
  // console.log(keyName);
});

popupBackground.addEventListener('click', event => {
  closePopup();
});
