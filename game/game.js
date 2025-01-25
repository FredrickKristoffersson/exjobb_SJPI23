// Set up the canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
const canvasWidth = 1200; // Sätt önskad canvas bredd
const canvasHeight = 600; // Sätt önskad canvas höjd
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'images/game_background.png';

// Load the sprite sheet image
const spriteSheet = new Image();
spriteSheet.src = 'images/egen_figur.png';

// Sprite sheet dimensions
const spriteWidth = 128;
const spriteHeight = 128;
const numFrames = 2; // Total number of frames in the sprite sheet

// Animation variables
let currentFrame = 0; // Current frame of animation
let frameDelay = 700; // Delay between frames in milliseconds
let lastFrameTime = performance.now(); // Timestamp for last frame change

// Sprite position and speed
let spriteX = canvas.width / 2 - spriteWidth / 2;
let spriteY = canvas.height - spriteHeight;
let spriteSpeed = 10;

// Key state tracking
const keys = {};

// Event listeners for key presses
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Draw the background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawSprite() {
    ctx.drawImage(
        spriteSheet,
        0, currentFrame * spriteHeight, // Source position on the sprite sheet (x remains 0, y is adjusted)
        spriteWidth, spriteHeight, // Source size
        spriteX, spriteY, // Destination position on canvas
        spriteWidth, spriteHeight // Destination size
    );
}

// Update sprite position based on keys pressed
function updatePosition() {
    if (keys['ArrowLeft']) {
        spriteX -= spriteSpeed;
    }
    if (keys['ArrowRight']) {
        spriteX += spriteSpeed;
    }
    if (keys['ArrowUp']) {
        spriteY -= spriteSpeed;
    }
    if (keys['ArrowDown']) {
        spriteY += spriteSpeed;
    }

    // Prevent sprite from leaving canvas
    spriteX = Math.max(0, Math.min(canvas.width - spriteWidth, spriteX));
    spriteY = Math.max(0, Math.min(canvas.height - spriteHeight, spriteY));
}

function updateFrame() {
    const currentTime = performance.now();
    if (currentTime - lastFrameTime >= frameDelay) {
        lastFrameTime = currentTime;
        currentFrame = (currentFrame + 1) % numFrames;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw everything in the correct order
    drawBackground();
    updatePosition();
    updateFrame();
    drawSprite();
}

// Start the animation once both images are loaded
backgroundImage.onload = () => {
    spriteSheet.onload = () => {
        animate();
    };
};
