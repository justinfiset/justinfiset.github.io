const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let running = false; // Game state

const size = 20; // Cell size

let mouse = {
    x: -1,
    y: -1,
}; // Mouse position

// -1 is used to indicate that the mouse has not clicked a cell (default value)
let click = {
    x: -1,
    y: -1,
};

let newFrame = []; // Buffer for the last frame to calculate the next frame
let cells = []; // 2D array of cells

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
    running = !running; // Toggle game state
});

// Save mouse position
window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = Math.floor((event.clientX - rect.left) / size) * size;
    mouse.y = Math.floor((event.clientY - rect.top) / size) * size;
});

// Save clicked cell position
window.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    click.x = Math.floor((event.clientX - rect.left) / size);
    click.y = Math.floor((event.clientY - rect.top) / size);
});

const update = () => {
    if (click.x !== -1 && click.y !== -1) {
        // Ignore clicks outside the grid
        if (isInBounds(click.x, click.y)) {
            cells[click.x][click.y] = cells[click.x][click.y] === 1 ? 0 : 1; // Toggle cell state
            click = { x: -1, y: -1 }; // Reset click position to default<
            running = false; // Pause the game when clicking
        }
    }
};

const updateGrid = () => {
    if (running === false) {
        return;
    }

    // Game and cells logic
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            const neighboursCount = getNeighboursCount(x, y);
            if (neighboursCount < 2 || neighboursCount > 3) {
                newFrame[x][y] = 0; // RULE NO 1 and RULE NO 3: Cell dies of underpopulation or overpopulation
            } else if (
                neighboursCount === 3 ||
                (cells[x][y] === 1 && neighboursCount === 2)
            ) {
                newFrame[x][y] = 1; // RULE NO 2 and RULE NO 4 : Cell becomes alive or stays alive if exactly 3 neighbours
            }
        }
    }

    // Update cells with new calculated frame
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            cells[x][y] = newFrame[x][y];
        }
    }
};

const isInBounds = (x, y) => {
    return x >= 0 && y >= 0 && x < cells.length && y < cells[0].length;
};

const getNeighboursCount = (x, y) => {
    let count = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) {
                continue;
            } else {
                if (isInBounds(i, j)) {
                    count += cells[i][j]; // 1 if alive, 0 if dead
                }
            }
        }
    }

    return count;
};

const draw = () => {
    playButton.innerText = running ? "Pause" : "Play"; // Update button text
    playButton.style.backgroundColor = running ? "#F44336" : "#4CAF50"; // Update button color

    drawCells();
    drawMousePosition();

    // Render grid on top
    drawGrid();
};

const drawMousePosition = () => {
    const x = Math.floor(mouse.x / size);
    const y = Math.floor(mouse.y / size);

    if (isInBounds(x, y)) {
        const isActive = cells[x][y] === 1;
        ctx.fillStyle = isActive ? "dimgray" : "silver";
        ctx.fillRect(mouse.x, mouse.y, size, size);
    }
};

const drawCells = () => {
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[x].length; y++) {
            if (cells[x][y] === 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * size, y * size, size, size);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x * size, y * size, size, size);
            }
        }
    }
};

const drawGrid = () => {
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x += size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += size) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();
};

const run = () => {
    update();
    draw();

    requestAnimationFrame(run); // Request the next frame
};

const fixedUpdate = () => {
    updateGrid();

    setTimeout(() => {
        requestAnimationFrame(fixedUpdate);
    }, 1000 / 10); // Second number is the FPS (frames per second)
};

const init = () => {
    const xCount = Math.floor(canvas.width / size);
    const yCount = Math.floor(canvas.height / size);
    for (let x = 0; x < xCount; x++) {
        cells[x] = [];
        newFrame[x] = [];
        for (let y = 0; y < yCount; y++) {
            cells[x][y] = 0;
            newFrame[x][y] = 0;
        }
    }

    // Launch both game loops (one for the game logic and other for the rendering)
    run();
    fixedUpdate();
};

init();
