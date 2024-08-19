document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    let isJumping = false;
    let jumpCount = 0;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        jumpCount = 0;
        
        const jumpInterval = setInterval(() => {
            if (jumpCount >= 15) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (jumpCount <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    jumpCount--;
                    dino.style.bottom = `${50 + jumpCount * 2}px`;
                }, 20);
            }
            jumpCount++;
            dino.style.bottom = `${50 + jumpCount * 2}px`;
        }, 20);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            jump();
        }
    });

    function moveObstacle() {
        let obstaclePosition = window.innerWidth;
        const obstacleInterval = setInterval(() => {
            if (obstaclePosition < 0) {
                obstaclePosition = window.innerWidth;
            }
            obstaclePosition -= 5;
            obstacle.style.left = `${obstaclePosition}px`;
            
            if (obstaclePosition < 100 && obstaclePosition > 50 && parseInt(dino.style.bottom) < 100) {
                alert('Game Over!');
                obstaclePosition = window.innerWidth;
            }
        }, 20);
    }
    
    moveObstacle();
});
