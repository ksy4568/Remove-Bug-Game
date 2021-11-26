import Modal from './modal.js';
import View from './view.js';
import GameFunc from './gameFunc.js';

// game const
let ICON_SIZE = 80;
let BUG_NUM = 10;
let IS_START = false;
let REMAINING_TIME = undefined;
let CHARACTER = {
  bug: {name: 'bug', link: './assets/image/bug.png'},
  computer: {name: 'computer', link: './assets/image/computer.png'}
}

new Modal();
new View(ICON_SIZE);
new GameFunc(IS_START, REMAINING_TIME, BUG_NUM, CHARACTER);


