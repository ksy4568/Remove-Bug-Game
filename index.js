let header = document.querySelector('.header');
let main = document.querySelector('.main');
let gameView = document.querySelector('.gameView');
let timeBox = document.querySelector('.timeBox');
let gameBtn = document.querySelector('.gameBtn');
let gameModal = document.querySelector('.fullScreenModal');
let modalMessage = document.querySelector('.modalMessage');
let bugCount = document.querySelector('.bugCount');
let replayBtn = document.querySelector('.replayGameBtn');

let computerImg = './assets/image/computer.png';
let bugImg = './assets/image/bug.png';

// game state
let countingBug = 10;
let isStart = false;


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

  elImg.addEventListener('click', () => {
    if(elImg.getAttribute('class') === 'computer') {
      showModal('You Lose');
      return;
    }
    if(elImg.getAttribute('class') === 'bug') {
      elImg.parentNode.removeChild(elImg);
      countingBug -= 1;
      bugCount.innerHTML = countingBug;

      if(countingBug === 0 ) {
        showModal('You Win!!');
      }
    }
  })

  return elImg;
}


const getRandomPosition = () => {
  let pos = {
    x: 0,
    y: 0,
  }
  let gameViewArea = gameView.getBoundingClientRect();
  let gameViewWidth = gameViewArea.width - 80;
  let gameViewHeight = gameViewArea.height - 80;
  
  pos.x = Math.floor(Math.random() * gameViewWidth + 1) + 1;
  pos.y = Math.floor(Math.random() * gameViewHeight + 1) + 1;

  return pos;
}


const startGame = () => {
  let seconds = 9;

  const countingTime = () => {
    timeBox.innerHTML = 10;

    let times = setInterval(function () {
      timeBox.innerHTML = seconds;
      seconds -= 1;
  
      if(seconds === -1) {
        gameBtn.innerHTML = '<i class="fas fa-play gameBtn"></i>';
        showModal('You Lose')
        clearInterval(times);
      }
    }, 1000)
  }




  gameBtn.addEventListener('click', () => {
    bugCount.innerHTML = countingBug;
    if(!isStart) {
      gameBtn.innerHTML = '<i class="fas fa-stop gameBtn"></i>';
      isStart = !isStart;
      countingTime();

      for(let i = 0; i < 10; i++) {
        gameView.appendChild(createImg(computerImg, getRandomPosition(), "computer"));
        gameView.appendChild(createImg(bugImg, getRandomPosition(), 'bug'));
      } 
    } else {
      gameBtn.innerHTML = '<i class="fas fa-play gameBtn"></i>'
      isStart = !isStart;
    }
  });
}





startGame();
