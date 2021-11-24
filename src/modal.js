'use strict'

export default class Modal {
  constructor() {
    this.popUp = document.querySelector('.fullScreenModal');
    this.message = document.querySelector('.modalMessage');
  }

  toggle(isOn, message) {
    isOn ? this.popUp.classList.remove('hide') : this.popUp.classList.add('hide');
    this.message.innerHTML = message;
  }
}