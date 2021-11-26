'use strict';

import Modal from './modal.js';
import View from './view.js';

let modal = new Modal();
let view = new View(80);

export default class GameFunc {
  constructor(IS_START, REMAINING_TIME, BUG_NUM, CHARACTER) {
    this.IS_START = IS_START;
    this.REMAINING_TIME = REMAINING_TIME;
    this.BUG_NUM = BUG_NUM;
    this.CHARACTER = CHARACTER;

    this.timeBox = document.querySelector('.timeBox');
    this.bugCount = document.querySelector('.bugCount');
    this.gameBtn = document.querySelector('.gameBtn');
    this.gameBtn.addEventListener('click', (e) => {
      if(e.target.matches('.fa-play')) {
        this.startGame()
      } else {
        this.stopGame('다시 도전하시겠습니까?');
        this.gameBtn.innerHTML = this.playIcon;
      }
    })
    this.replayBtn = document.querySelector('.replayGameBtn');
    this.replayBtn.addEventListener('click', () => {
      this.BUG_NUM = 10;
      modal.toggle(IS_START);
      this.startGame();
    })
    this.gameView = document.querySelector('.gameView');
    this.gameView.addEventListener('click', (e) => {
      if(e.target.matches('.computer')) {
        this.stopGame('노트북을 뿌시다니...');
        return;
      }
      if(e.target.matches('.bug')) {
        this.gameView.removeChild(e.target);
        this.BUG_NUM -= 1;
        this.bugCount.innerHTML = this.BUG_NUM;
    
        if(this.BUG_NUM === 0 ) {
          this.stopGame('버그 박멸 성공!!');
        }
      }
    })
    
    this.playIcon = '<i class="fas fa-play gameBtn"></i>';
    this.stopIcon = '<i class="fas fa-stop gameBtn"></i>';
  }

  startGame () {
    this.bugCount.innerHTML = this.BUG_NUM;
    this.gameBtn.innerHTML = this.stopIcon;
    this.gameView.innerHTML = '';
    this.IS_START = !this.IS_START;
    this._countingTime(10);
  
    for(let i = 0; i < this.BUG_NUM; i++) {
      this.gameView.appendChild(view.createImg(this.CHARACTER.computer.link, this.CHARACTER.computer.name));
      this.gameView.appendChild(view.createImg(this.CHARACTER.bug.link, this.CHARACTER.bug.name));
    } 
  }

  stopGame (message) {
    modal.toggle(this.IS_START, message);
    this.IS_START = !this.IS_START;
    this.REMAINING_TIME = function () {
      return;
    };
  }

  _countingTime (seconds) {
    this.timeBox.innerHTML = seconds;
    this.REMAINING_TIME = function (seconds) {
      this.timeBox.innerHTML = seconds;
      if(seconds <= 0) {
        this.gameBtn.innerHTML = this.playIcon;
        this.stopGame('배포 예정일이 지났습니다..');
        clearTimeout(this.REMAINING_TIME);
        return;
      }
      setTimeout(() => this.REMAINING_TIME(--seconds), 1000);
    };
    setTimeout(() => this.REMAINING_TIME(seconds), 0);
  }
}