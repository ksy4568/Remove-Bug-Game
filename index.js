// get DOM
let header = document.querySelector('.header');
let main = document.querySelector('.main');
let gameView = document.querySelector('.gameView');
let timeBox = document.querySelector('.timeBox');
let gameBtn = document.querySelector('.gameBtn');
let gameModal = document.querySelector('.fullScreenModal');
let modalMessage = document.querySelector('.modalMessage');
let bugCount = document.querySelector('.bugCount');
let replayBtn = document.querySelector('.replayGameBtn');

// get Image
let computerImg = './assets/image/computer.png';
let bugImg = './assets/image/bug.png';

// game state
let countingBug = 10;
let isStart = false;
let time = undefined;


// show Modal
const showModal = (message) => {
  gameModal.style.display = 'flex';
  modalMessage.innerHTML = message;
}

// create Image
const createImg = (el, pos, className) => {
  let elImg = new Image(80, 80);
  elImg.src = el;
  elImg.setAttribute('class', className);
  elImg.style.position = 'absolute';
  elImg.style.left = `${pos.x}px`;
  elImg.style.top = `${pos.y}px`;
  elImg.style.transition = 'all ease 0.3s'
  elImg.style.cursor = 'pointer';

  elImg.addEventListener('mouseover', () => {
    elImg.style.transform = 'scale(1.2, 1.2)';
  })
  elImg.addEventListener('mouseleave', () => {
    elImg.style.transform = 'scale(1, 1)';
  })

  return elImg;
}

const getRandomPosition = () => {
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

const removeBug = () => {
  gameView.addEventListener('click', (e) => {
    if(e.target.matches('.computer')) {
      showModal('You Lose');
      isStart = !isStart;
      clearInterval(time);
      return;
    }
    if(e.target.matches('.bug')) {
      gameView.removeChild(e.target);
      countingBug -= 1;
      bugCount.innerHTML = countingBug;

      if(countingBug === 0 ) {
        showModal('You Win!!');
        isStart = !isStart;
        clearInterval(time);
      }
      return;
    }
  })
}
removeBug();

const countingTime = (seconds) => {
  timeBox.innerHTML = 10;

  time = setInterval(function () {
    timeBox.innerHTML = seconds;
    seconds -= 1;

    if(seconds === -1) {
      gameBtn.innerHTML = '<i class="fas fa-play gameBtn"></i>';
      showModal('You Lose')
      clearInterval(time);
    }
  }, 1000)
}


const startGame = () => {
  bugCount.innerHTML = countingBug;
  gameBtn.innerHTML = '<i class="fas fa-stop gameBtn"></i>';
  isStart = !isStart;
  countingTime(9);

  for(let i = 0; i < countingBug; i++) {
    gameView.appendChild(createImg(computerImg, getRandomPosition(), "computer"));
    gameView.appendChild(createImg(bugImg, getRandomPosition(), 'bug'));
  } 
}

replayBtn.addEventListener('click', () => {
  countingBug = 10;
  gameModal.style.display = 'none';
  gameView.innerHTML = '';
  startGame();
})

gameBtn.addEventListener('click', (e) => {
  if(e.target.matches('.fa-play')) {
    gameView.innerHTML = '';
    startGame()
  } else {
    clearInterval(time);
    gameBtn.innerHTML = '<i class="fas fa-play gameBtn"></i>'
  }
})
