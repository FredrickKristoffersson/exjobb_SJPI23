var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
if (!context) {
    throw new Error('Canvas rendering context could not be initialized.');
}

canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var backgroundImage = new Image();
backgroundImage.src = 'background.png';

var spriteSheet = new Image();
spriteSheet.src = 'sprite_sheet.png';

var treeSprite = new Image();
treeSprite.src = 'tree.png';

var sprite = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 64, // Bredd på en frame i spritesheet
    height: 64, // Höjd på en frame i spritesheet
    speed: 5,
    dx: 0,
    dy: 0,
    isJumping: false,
    gravity: 0.5,
    jumpStrength: -10,
    groundY: canvas.height - 50,
    frameIndex: 0, // Nuvarande frame i spritesheet
    totalFrames: 4, // Antal frames för animeringen
    frameDelay: 5, // Fördröjning innan nästa frame
    frameCounter: 0 // Räknare för att hantera fördröjning
};

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (!sprite.isJumping) {
                sprite.dy = sprite.jumpStrength;
                sprite.isJumping = true;
            }
            break;
        case 'ArrowLeft':
            sprite.dx = -sprite.speed;
            break;
        case 'ArrowRight':
            sprite.dx = sprite.speed;
            break;
    }
});

window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            sprite.dx = 0;
            break;
    }
});

function update() {
    sprite.x += sprite.dx;
    sprite.y += sprite.dy;

    if (sprite.isJumping) {
        sprite.dy += sprite.gravity;
    }

    if (sprite.x < 0) {
        sprite.x = 0;
    } else if (sprite.x + sprite.width > canvas.width) {
        sprite.x = canvas.width - sprite.width;
    }

    if (sprite.y + sprite.height >= sprite.groundY) {
        sprite.y = sprite.groundY - sprite.height;
        sprite.dy = 0;
        sprite.isJumping = false;
    }

    if (sprite.dx !== 0) {
        sprite.frameCounter++;
        if (sprite.frameCounter >= sprite.frameDelay) {
            sprite.frameCounter = 0;
            sprite.frameIndex = (sprite.frameIndex + 1) % sprite.totalFrames;
        }
    } else {
        sprite.frameIndex = 0; // Återställ till första framen när figuren står still
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.drawImage(
        spriteSheet,
        sprite.frameIndex * sprite.width, // X-koordinat för nuvarande frame
        0, // Y-koordinat (om alla frames är på samma rad)
        sprite.width,
        sprite.height,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height
    );

    // Rita trädet
    context.drawImage(treeSprite, 100, canvas.height - 200, 100, 200);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
