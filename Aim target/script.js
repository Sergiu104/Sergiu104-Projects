const start = document.querySelector('#start');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const screens = document.querySelectorAll ('.screen');
const timeList = document.querySelector('.time-list');
const board = document.querySelector('#board');
const timer = document.querySelector('#time');
let interval = null;

let time = 0;
let score = 0;

start.addEventListener('click', () => {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        score++;

        event.target.remove();
        createRandomCircle();
    }
});

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.backgroundColor = '1e1e1e';
    element.style.boxShadow = `0 0 2px #000`;
}

function startGame() {    
   interval = setInterval(decreaseTime, 1000);
   createRandomCircle();
   setTimer(time);
}

function finishGame() {
    clearInterval(interval);
    board.innerHTML = `<h1>Score: <span class='primary'>${score}</span></h1>`;
    timer.parentNode.innerHTML = '';
}

function decreaseTime() {
    if(time === 0 ) {
        finishGame();
    } else {
        --time;
        setTimer(time)
    }

}

function setTimer(value){ 
    if(value < 10) {

    timer.innerHTML = `00:0${value}`;
    } else { 

    timer.innerHTML = `00:${value}`;
};
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 50);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}


function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);
}


