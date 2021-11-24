import Modal from './modal.js';

// get DOM
let gameView = document.querySelector('.gameView');
let timeBox = document.querySelector('.timeBox');
let gameBtn = document.querySelector('.gameBtn');
let bugCount = document.querySelector('.bugCount');
let replayBtn = document.querySelector('.replayGameBtn');

// get Icon
let playIcon = '<i class="fas fa-play gameBtn"></i>';
let stopIcon = '<i class="fas fa-stop gameBtn"></i>';

// game const
let BUG_NUM = 10;
let IS_START = false;
let REMAINING_TIME = undefined;
let CHARACTER = {
  bug: {name: 'bug', link: './assets/image/bug.png'},
  computer: {name: 'computer', link: './assets/image/computer.png'}
}

let modal = new Modal();

// create Image
const createImg = (charactor, pos, className) => {
  let charactorImg = new Image(80, 80);
  charactorImg.src = charactor;
  charactorImg.setAttribute('class', className);
  charactorImg.style.left = `${pos.x}px`;
  charactorImg.style.top = `${pos.y}px`;

  return charactorImg;
}

const getRandomPosition = (gameView) => {
  let pos = {
    x: 0,
    y: 0,
  }
  let gameViewArea = gameView.getBoundingClientRect();
  let gameViewWidth = gameViewArea.width - 90;
  let gameViewHeight = gameViewArea.height - 90;
  
  pos.x = Math.floor(Math.random() * gameViewWidth + 1) + 1;
  pos.y = Math.floor(Math.random() * gameViewHeight + 1) + 1;

  return pos;
}

const stopGame = (message) => {
  modal.toggle(IS_START, message);
  IS_START = !IS_START;
  clearTimeout(REMAINING_TIME);
  REMAINING_TIME = undefined;
}

const removeBug = () => {
  gameView.addEventListener('click', (e) => {
    if(e.target.matches('.computer')) {
      stopGame('노트북을 뿌시다니...')
      return;
    }
    if(e.target.matches('.bug')) {
      gameView.removeChild(e.target);
      BUG_NUM -= 1;
      bugCount.innerHTML = BUG_NUM;

      if(BUG_NUM === 0 ) {
        stopGame('버그 박멸 성공!!');
      }
    }
  })
}
removeBug();

const countingTime = (seconds) => {
  REMAINING_TIME = function () {
    timeBox.innerHTML = seconds;
    seconds -= 1;

    if(seconds < 0) {
      gameBtn.innerHTML = playIcon;
      stopGame('배포 예정일이 지났습니다..');
      clearTimeout(REMAINING_TIME);
      return;
    }

    setTimeout(REMAINING_TIME, 1000);
  }

  setTimeout(REMAINING_TIME, 0);
}


const startGame = () => {
  bugCount.innerHTML = BUG_NUM;
  gameBtn.innerHTML = stopIcon;
  gameView.innerHTML = '';
  IS_START = !IS_START;
  countingTime(10);

  for(let i = 0; i < BUG_NUM; i++) {
    gameView.appendChild(createImg(CHARACTER.computer.link, getRandomPosition(gameView), "computer"));
    gameView.appendChild(createImg(CHARACTER.bug.link, getRandomPosition(gameView), 'bug'));
  } 
}

replayBtn.addEventListener('click', () => {
  BUG_NUM = 10;
  modal.toggle(IS_START);
  startGame();
})

gameBtn.addEventListener('click', (e) => {
  if(e.target.matches('.fa-play')) {
    startGame()
  } else {
    stopGame('다시 도전하시겠습니까?');
    gameBtn.innerHTML = playIcon;
  }
})
