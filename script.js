const cubes = document.querySelectorAll('.cube');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');

let sequence = [];
let playerSequence = [];
let score = 0;
let isPlaying = false;
let startTime;
let timerInterval;

// Start the game
startBtn.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreDisplay.innerText = score;
    messageDisplay.innerText = "Watch the sequence...";
    isPlaying = true;
    startBtn.disabled = true;
    
    // Reset and start Timer
    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);

    nextRound();
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${minutes}:${seconds}`;
}

function nextRound() {
    playerSequence = [];
    const nextId = Math.floor(Math.random() * 9);
    sequence.push(nextId);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        activateCube(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            messageDisplay.innerText = "Your turn!";
        }
    }, 800); // Speed of sequence
}

function activateCube(index) {
    const cube = cubes[index];
    cube.classList.add('active');
    setTimeout(() => cube.classList.remove('active'), 400);
}

// Handle User Clicks
cubes.forEach((cube, index) => {
    cube.addEventListener('click', () => {
        if (!isPlaying) return;
        
        activateCube(index);
        playerSequence.push(index);

        // Check input
        if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
            gameOver();
            return;
        }

        // Check if round is complete
        if (playerSequence.length === sequence.length) {
            score++;
            scoreDisplay.innerText = score;
            messageDisplay.innerText = "Correct! Next round...";
            setTimeout(nextRound, 1000);
        }
    });
});

function gameOver() {
    isPlaying = false;
    clearInterval(timerInterval);
    messageDisplay.innerText = `Game Over! Final Score: ${score}`;
    startBtn.disabled = false;
}
