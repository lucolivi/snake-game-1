const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = 'right';
let food = { x: gridSize * 10, y: gridSize * 10 };
let gameOver = false;

function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));
}

function drawFood() {
    drawRect(food.x, food.y, 'red');
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'right':
            head.x += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function gameLoop() {
    if (gameOver) {
        alert('Game Over');
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();

    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

gameLoop();
