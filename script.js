document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    const scoreElement = document.getElementById('score');
    
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let gameInterval;

    const JUMP_MAX_HEIGHT = 80; // Maximum height of the jump
    const JUMP_SPEED = 20;      // Time in ms for each jump step
    const OBSTACLE_SPEED = 10;  // Speed at which obstacle moves
    const GRAVITY = 2;          // Gravity effect during the fall

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let jumpCount = 0;

        // Jump upwards
        const jumpInterval = setInterval(() => {
            if (jumpCount >= JUMP_MAX_HEIGHT) {
                clearInterval(jumpInterval);
                // Start falling
                const fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                        jumpHeight = 0;
                        dino.style.bottom = '50px';
                    } else {
                        jumpHeight -= GRAVITY;
                        dino.style.bottom = `${50 + jumpHeight}px`;
                    }
                }, JUMP_SPEED);
            } else {
                jumpHeight += 4; // Adjust this value for jump speed
                dino.style.bottom = `${50 + jumpHeight}px`;
                jumpCount++;
            }
        }, JUMP_SPEED);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            jump();
        }
    });

    function moveObstacle() {
        let obstaclePosition = window.innerWidth;

        const obstacleInterval = setInterval(() => {
            if (obstaclePosition < -30) {
                obstaclePosition = window.innerWidth;
                score++;
                updateScore();
            } else {
                obstaclePosition -= OBSTACLE_SPEED;
            }
            obstacle.style.left = `${obstaclePosition}px`;

            // Collision detection
            if (obstaclePosition < 100 && obstaclePosition > 50 && parseInt(dino.style.bottom) < 100) {
                clearInterval(obstacleInterval);
                clearInterval(gameInterval);
                alert(`Game Over! Your score: ${score}`);
            }
        }, 20); // Update obstacle position every 20ms
    }

    function updateScore() {
        scoreElement.innerText = `Score: ${score}`;
    }

    function startGame() {
        score = 0;
        updateScore();
        moveObstacle();
        gameInterval = setInterval(moveObstacle, 20); // Keep the game loop running
    }

    startGame();
});
