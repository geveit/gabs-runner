import SpriteAnimation from "./SpriteAnimation";
import { DEFAULT_GROUND_HEIGHT, DEFAULT_MAX_JUMP_HEIGHT, DEFAULT_MIN_JUMP_HEIGHT, DEFAULT_PLAYER_HEIGHT, DEFAULT_PLAYER_WIDTH, DEFAULT_PLAYER_X, GRAVITY, PLAYER_JUMP_IMAGE, PLAYER_JUMP_SPEED, PLAYER_RUN_IMAGE, PLAYER_SCALE, RUN_ANIMATION_TIMER } from "./constants";


export default class Player {
    private ctx: CanvasRenderingContext2D;
    private scaleRatio: number;

    private readonly width: number;
    private readonly height: number;
    private readonly maxJumpHeight: number;
    private readonly minJumpHeight: number;

    private x: number;
    private y: number;
    private groundY: number;

    private currentAnimation: SpriteAnimation;
    private runAnimation: SpriteAnimation;
    private jumpAnimation: SpriteAnimation;

    private runAnimationTimer = RUN_ANIMATION_TIMER;

    private jumpPressed: boolean = false;
    private jumpInProgress: boolean = false;
    private falling: boolean = false;

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number, gameHeight: number) {
        this.ctx = ctx;
        this.scaleRatio = scaleRatio;

        this.width = (DEFAULT_PLAYER_WIDTH * PLAYER_SCALE) * scaleRatio;
        this.height = (DEFAULT_PLAYER_HEIGHT * PLAYER_SCALE) * scaleRatio;
        this.maxJumpHeight = DEFAULT_MAX_JUMP_HEIGHT * scaleRatio;
        this.minJumpHeight = DEFAULT_MIN_JUMP_HEIGHT * scaleRatio;

        this.x = DEFAULT_PLAYER_X * scaleRatio;
        this.y = gameHeight - this.height - DEFAULT_GROUND_HEIGHT * scaleRatio;
        this.groundY = this.y;

        this.jumpAnimation = new SpriteAnimation(PLAYER_JUMP_IMAGE, 1, DEFAULT_PLAYER_HEIGHT, DEFAULT_PLAYER_WIDTH);
        this.runAnimation = new SpriteAnimation(PLAYER_RUN_IMAGE, 6, DEFAULT_PLAYER_HEIGHT, DEFAULT_PLAYER_WIDTH);
        this.currentAnimation = this.runAnimation;

        window.removeEventListener('keydown', this.keyup)
        window.removeEventListener('keyup', this.keydown)
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);

        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);
        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);
    }

    update(gameSpeed: number, deltaTime: number): void {
        this.run(gameSpeed, deltaTime);

        if (this.jumpInProgress) {
            this.currentAnimation = this.jumpAnimation;
        }
        else {
            this.currentAnimation = this.runAnimation;
        }

        this.jump(deltaTime);
    }
    
    draw(): void {
        this.currentAnimation.draw(this.ctx, this.x, this.y, this.width, this.height);
    }

    getCollisionBox() {
        return {
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width
        };
    }

    private run(gameSpeed: number, deltaTime: number): void {
        if (this.runAnimationTimer <= 0) {
            this.currentAnimation.updateFrame();
            this.runAnimationTimer = RUN_ANIMATION_TIMER;
        }
        this.runAnimationTimer -= deltaTime * gameSpeed;
    }

    private jump(deltaTime: number): void {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.ctx.canvas.height - this.minJumpHeight ||
                (this.y > this.ctx.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
                this.y -= PLAYER_JUMP_SPEED * deltaTime * this.scaleRatio;
            }
            else {
                this.falling = true;
            }
        }
        else {
            if (this.y < this.groundY) {
                this.y += GRAVITY * deltaTime * this.scaleRatio;
                if (this.y + this.height > this.ctx.canvas.height) {
                    this.y = this.groundY;
                }
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    private keydown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            this.jumpPressed = true;
        }
    }

    private keyup = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            this.jumpPressed = false;
        }
    }

    private touchstart = () => {
        this.jumpPressed = true;
    }

    private touchend = () => {
        this.jumpPressed = false;
    }
}