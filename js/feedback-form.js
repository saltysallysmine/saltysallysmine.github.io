class FeedbackPopup {

  constructor(form_index) {
    this.container = document.querySelector("#feedback-form");
    this.form = this.container.querySelector(`#form-${form_index}`);
    this.submitButton = this.form.querySelector("button[type=submit]");
    this.background = this.container.querySelector(".popup-background");
    this.openingLink = document.querySelector("#feedback-opening-link");
    this.isOpened = false;
    this.registerEventListeners();
  }

  openPopup = () => {
    this.isOpened = true;
    this.container.classList.remove("feedback-form-container--closed");
    this.container.classList.add("feedback-form-container--opened");
    this.container.classList.add("popup-container--opened");
    this.background.classList.add("popup-background--opened");
  }

  closePopup = () => {
    this.isOpened = false;
    this.container.classList.add("feedback-form-container--closed");
    this.container.classList.remove("feedback-form-container--opened");
    this.background.classList.remove("popup-background--opened");
  }

  preventAndOpenPopup = (event) => {
    event.preventDefault();
    this.openPopup();
  }
  
  keyboardListener = (event) => {
    let keyName = event.key;
    if (this.isOpened) {
      switch (keyName) {
        case "Escape":
          this.closePopup();
          break;
      }
    }
  }

  registerEventListeners = () => {
    this.openingLink.addEventListener('click', this.preventAndOpenPopup);
    document.addEventListener('keydown', this.keyboardListener);
    this.background.addEventListener('click', this.closePopup);
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(1);
    });
  }

};

let feedbackPopup = new FeedbackPopup(1);

