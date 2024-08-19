document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const obstacle = document.getElementById('obstacle');
    let isJumping = false;
    let jumpCount = 0;
    let score = 0;
    let gameInterval;

    const jumpHeight = 60; // Increased jump height
    const jumpSpeed = 20;  // Increased speed of jump
    const obstacleSpeed = 10; // Increased speed of obstacle movement

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
                        dino.style.bottom = `${50 + jumpCount}px`;
                    }
                }, jumpSpeed);
            } else {
                jumpCount++;
                dino.style.bottom = `${50 + jumpCount}px`;
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
            if (obstaclePosit
