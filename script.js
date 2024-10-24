const gameArea = document.getElementById('gameArea');
const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isPlaying = false;

function moveCircle() {
    const maxX = gameArea.clientWidth - circle.clientWidth;
    const maxY = gameArea.clientHeight - circle.clientHeight;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    circle.style.left = newX + 'px';
    circle.style.top = newY + 'px';
}

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Visual feedback
    circle.classList.add('clicked');
    setTimeout(() => {
        circle.classList.remove('clicked');
    }, 100);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        endGame();
    }
}

function startGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = 'Time: 30s';
    
    moveCircle();
    gameInterval = setInterval(moveCircle, 1000);
    timerInterval = setInterval(updateTimer, 1000);
    
    startBtn.textContent = 'Game In Progress';
    startBtn.disabled = true;
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    isPlaying = false;
    alert(`Game Over! Your score: ${score}`);
    
    startBtn.textContent = 'Start Game';
    startBtn.disabled = false;
}

circle.addEventListener('mousedown', (e) => {
    e.stopPropagation(); // Prevent gameArea from receiving the click
    if (isPlaying) {
        updateScore();
        moveCircle();
    }
});

// Prevent dragging of the circle
circle.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

startBtn.addEventListener('click', startGame);