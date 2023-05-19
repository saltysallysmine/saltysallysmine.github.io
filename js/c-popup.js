class CookiesPopup {

  constructor() {
    this.container = document.querySelector("#c-pop");
    this.background = this.container.querySelector(".popup-background");
    this.isOpened = false;
    this.registerEventListeners();
    this.openPopup();
  }

  getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  userWasOnSite = () => {
    return this.getCookie("close-popup") == "true";
  }

  openPopup = async () => {
    if (this.userWasOnSite()) {
      return ;
    }
    await new Promise(_ => setTimeout(_, 3000));
    this.isOpened = true;
    this.container.classList.add("popup-container--opened");
    this.background.classList.add("popup-background--opened");
  }

  closePopup = async () => {
    document.cookie = "close-popup=true;";
    this.isOpened = false;
    this.background.classList.remove("popup-background--opened");
    this.container.classList.remove("popup-container--opened");
  }

  registerEventListeners = () => {
    this.background.addEventListener('click', this.closePopup);
  }

};

let cookiesPopup = new CookiesPopup();

