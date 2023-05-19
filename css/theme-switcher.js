class ThemeSwitcher {

  constructor() {
    this.button = document.querySelector('.theme-switcher');
    this.cssLink = document.querySelector('.theme-file-link');
    setButtonEventListener();
  }

  buttonCLick = () => {

  }

  setButtonEventListener = () => {
    this.button.addEventListener('click', this.buttonCLick);
  }

}

let themeSwitcher = new ThemeSwitcher();
