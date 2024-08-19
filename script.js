document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    let isJumping = true;
    let jumpCount = 0;
    let score = 0;
    let gameInterval;
    
    const jumpHeight = 30; // increased to maintain a higher jump
    const jumpSpeed = 10;  // reduced from 20ms to 10ms for faster jump
    const obstacleSpeed = 10; // increased from 5 to 10 for faster obstacle movement

    function jump() {
        if (isJumping) return;
        isJumping = true;
        jumpCount = 0;
        
        const jumpInterval = setInterval(() => {
            if (jumpCount >= jumpHeight) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpCount <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                        dino.style.bottom = '50px';
                    } else {
                        jumpCount--;
                        dino.style.bottom = `${50 + jumpCount * 2}px`;
                    }
                }, jumpSpeed);
            } else {
                jumpCount++;
                dino.style.bottom = `${50 + jumpCount * 2}px`;
            }
        }, jumpSpeed);
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
                obstaclePosition -= obstacleSpeed;
            }
            obstacle.style.left = `${obstaclePosition}px`;

            // Check for collision
            if (obstaclePosition < 100 && obstaclePosition > 50 && parseInt(dino.style.bottom) < 100) {
                clearInterval(obstacleInterval);
                clearInterval(gameInterval);
                alert(`Game Over! Your score: ${score}`);
            }
        }, 20); // Maintained the interval for consistency in the game loop
    }

    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
    }

    function startGame() {
        score = 0;
        updateScore();
        moveObstacle();
        gameInterval = setInterval(moveObstacle, 20); // Maintained the interval for consistency in the game loop
    }

    startGame();
});
