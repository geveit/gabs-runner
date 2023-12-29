import Clouds from "./Clouds";
import Ground from "./Ground";
import ObstaclesController from "./ObstaclesController";
import Player from "./Player";
import Score from "./Score";
import { DEFAULT_GAME_HEIGHT, DEFAULT_GAME_WIDTH, FONT_COLOR, FONT_FAMILY, GAMEOVER_FONT_SIZE, GAME_SPEED_INCREMENT, GAME_SPEED_START, WAITING_TO_START_FONT_SIZE } from "./constants";

let scaleRatio = getScaleRatio();
let canvas = <HTMLCanvasElement> document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameHeight = canvas.height;
let previousTime: number;
let gameSpeed = GAME_SPEED_START;
let gameover = false;
let eventListenersForRestart = false;
let waitingToStart = true;

let player: Player;
let ground: Ground;
let score: Score;
let clouds: Clouds;
let obstaclesController: ObstaclesController;

function getScaleRatio(): number {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
    const screenWidht = Math.min(window.innerWidth, document.documentElement.clientWidth);

    if (screenWidht / screenHeight < DEFAULT_GAME_WIDTH / DEFAULT_GAME_HEIGHT) {
        return screenWidht / DEFAULT_GAME_WIDTH;
    }

    return screenHeight / DEFAULT_GAME_HEIGHT;
}

function scaleScreen(): void {
    scaleRatio = getScaleRatio();
    canvas.width = DEFAULT_GAME_WIDTH * scaleRatio;
    canvas.height = DEFAULT_GAME_HEIGHT * scaleRatio;
}

function clearScreen(): void {
    ctx.fillStyle = "#34cceb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function start(): void {
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keyup", restart, { once: true });
    window.addEventListener("touchstart", restart, { once: true });
    requestAnimationFrame(gameLoop);
}

function resize(): void {
    scaleScreen();
    scaleRatio = getScaleRatio();
    gameHeight = canvas.height;
    instantiateGameObjects();
}

function instantiateGameObjects(): void {
    player = new Player(ctx, scaleRatio, gameHeight);
    ground = new Ground(ctx, scaleRatio, gameHeight);
    obstaclesController = new ObstaclesController(ctx, scaleRatio);
    score = new Score(ctx, scaleRatio);
    clouds = new Clouds(ctx, scaleRatio);
}

function showGameover(): void {
    const fontSize = GAMEOVER_FONT_SIZE * scaleRatio;
    ctx.font = `${fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = FONT_COLOR;
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText("GAME OVER", x, y);
}

function showWatingToStart(): void {
    const fontSize = WAITING_TO_START_FONT_SIZE * scaleRatio;
    ctx.font = `${fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = FONT_COLOR;
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("Press Space or Tap Screen to Start", x, y);
}

function setupGameRestart() {
    if (!eventListenersForRestart) {
      eventListenersForRestart = true;
  
      setTimeout(() => {
        window.addEventListener("keyup", restart, { once: true });
        window.addEventListener("touchstart", restart, { once: true });
      }, 1000);
    }
}

function restart() {
    eventListenersForRestart = false;
    gameover = false;
    waitingToStart = false;
    ground.reset();
    score.reset();
    obstaclesController.reset();
    gameSpeed = GAME_SPEED_START;
}

function updateGameSpeed(deltaTime: number): void {
    gameSpeed += deltaTime * GAME_SPEED_INCREMENT;
}

function gameLoop(currentTime: number): void {
    if (previousTime === undefined) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;
    clearScreen();

    //Update objects
    if (!gameover && !waitingToStart) {
        clouds.update(gameSpeed, deltaTime);
        ground.update(gameSpeed, deltaTime);
        obstaclesController.update(gameSpeed, deltaTime);
        player.update(gameSpeed, deltaTime);
        score.update(deltaTime);
        updateGameSpeed(deltaTime);
    }

    if (!gameover && obstaclesController.collidingWith(player)) {
        gameover = true;
        setupGameRestart();
        score.setHighScore();
    }

    //Draw objects
    clouds.draw();
    ground.draw();
    obstaclesController.draw();
    player.draw();
    score.draw();

    if (gameover) {
        showGameover();
    }

    if (waitingToStart) {
        showWatingToStart();
    }

    requestAnimationFrame(gameLoop);
}

start();