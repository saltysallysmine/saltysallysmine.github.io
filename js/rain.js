class Rain {

  constructor() {
    this.rainContainer = document.querySelector(".rain-container");
    this.button = document.querySelector(".rain-button");
    this.drops = [];
    this.isFalling = false;
    this.makeDrops(80);
    this.setButtonEventListener();
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1;
  }

  makeDrops = (dropsCount) => {
    for (let i = 0; i < dropsCount; i++) {
      let leftPos = this.getRandomInt(100);
      let topPos = this.getRandomInt(20);
      let dropSize = this.getRandomInt(50);
      let dropStyle = `left: ${leftPos}vw; top: ${topPos}vh;`
        + `width: ${dropSize}px; height: ${dropSize}px;`;
      const newDrop = document.createElement("span");
      newDrop.setAttribute("class", `rain-drop`);
      newDrop.setAttribute("id", `rain-drop-${i}`);
      newDrop.setAttribute("style", dropStyle);
      this.drops.push(newDrop);
    }
    this.rainContainer.append(...this.drops);
  }

  setFallingForDropsFrom = (leftBorder, rightBorder) => {
    for (let i = leftBorder; i < rightBorder; i++) {
      let drop = this.drops[i];
      if (this.isFalling) {
        drop.classList.add('rain-drop--falling');
      } else {
        drop.classList.remove('rain-drop--falling');
      }
    }
  }

  setCorrectFalling = async () => {
    this.isFalling = !this.isFalling;
    for (let i = 0; i < this.drops.length / 10; i++) {
      this.setFallingForDropsFrom(i * 10, i * 10 + 10);
      await new Promise(_ => setTimeout(_, 200));
    }
  }

  setButtonEventListener = () => {
    this.button.addEventListener('click', this.setCorrectFalling);
  }

}

let rain = new Rain();
