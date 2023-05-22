class ThemeSwitcher {

  constructor() {
    this.button = document.querySelector('.theme-switcher');
    this.cssLink = document.querySelector('.theme-file-link');
    this.lightTheme = true;
    this.setButtonEventListener();
  }

  buttonCLick = () => {
    if (this.lightTheme) {
      this.button.textContent = "Светлая тема";
      this.cssLink.href = this.cssLink.href.replace('light', 'dark')
    } else {
      this.button.textContent = "Тёмная тема";
      this.cssLink.href = this.cssLink.href.replace('dark', 'light')
    }
    this.lightTheme = !this.lightTheme;
  }

  setButtonEventListener = () => {
    this.button.addEventListener('click', this.buttonCLick);
  }

}

let themeSwitcher = new ThemeSwitcher();
