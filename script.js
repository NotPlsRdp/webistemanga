const basket = document.getElementById('basket');
const ball = document.getElementById('ball');
const gameWidth = window.innerWidth;
const gameHeight = window.innerHeight;
const basketWidth = basket.offsetWidth;
const ballSize = ball.offsetWidth;

let basketX = (gameWidth - basketWidth) / 2;
let ballX = Math.random() * (gameWidth - ballSize);
let ballY = 0;
let score = 0;
let isGameOver = false;

// Move basket with arrow keys
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 20;
    } else if (event.key === 'ArrowRight' && basketX < gameWidth - basketWidth) {
        basketX += 20;
    }
    basket.style.left = `${basketX}px`;
});

// Game loop
function gameLoop() {
    if (isGameOver) return;

    ballY += 5;
    if (ballY > gameHeight) {
        ballY = 0;
        ballX = Math.random() * (gameWidth - ballSize);
    }

    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;

    // Check for collision
    if (
        ballY + ballSize > gameHeight - 30 &&
        ballX > basketX &&
        ballX < basketX + basketWidth
    ) {
        score++;
        ballY = 0;
        ballX = Math.random() * (gameWidth - ballSize);
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
