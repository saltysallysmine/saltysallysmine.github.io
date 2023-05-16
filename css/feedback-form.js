class FeedBackPopup {

  registerEventListeners() {
    this.openingLink.addEventListener('click', async function (event) {
      event.preventDefault();
      openPopup();
    });
    document.addEventListener('keydown', event => {
      let keyName = event.key;
      if (isOpened) {
        switch (keyName) {
          case "Escape":
            closePopup();
            break;
        }
      }
    });
    background.addEventListener('click', event => {
      closePopup();
    });
  }

  constructor() {
    this.container = document.querySelector("#feedback-form");
    this.background = this.popupContainer.querySelector(".popup-background");
    this.openingLink = document.querySelector("#feedback-opening-link");
    this.isOpened = false;

    registerEventListeners();
  }

  function openPopup() {
    this.isOpened = true;
    this.container.classList.add("popup-container--opened");
    this.background.classList.add("popup-background--opened");
  }

  function closePopup() {
    this.isOpened = false;
    this.container.classList.remove("popup-container--opened");
    this.background.classList.remove("popup-background--opened");
  }

};
