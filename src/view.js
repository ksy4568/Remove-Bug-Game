'use strict';

export default class View {
  constructor(ICON_SIZE) {
    this.ICON_SIZE = ICON_SIZE;
    this.view = document.querySelector('.gameView');
  }

  createImg (link, className) {
    let charactorImg = new Image(this.ICON_SIZE, this.ICON_SIZE);
    charactorImg.src = link;
    charactorImg.setAttribute('class', className);
    charactorImg.style.left = `${this._getRandomPosition().x}px`;
    charactorImg.style.top = `${this._getRandomPosition().y}px`;
  
    return charactorImg;
  }

  _getRandomPosition () {
    let pos = {
      x: 0,
      y: 0,
    }
    let viewArea = this.view.getBoundingClientRect();
    let viewWidth = viewArea.width - this.ICON_SIZE;
    let viewHeight = viewArea.height - this.ICON_SIZE;
    
    pos.x = Math.floor(Math.random() * viewWidth + 1) + 1;
    pos.y = Math.floor(Math.random() * viewHeight + 1) + 1;
  
    return pos;
  }
}