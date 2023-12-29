import { CLOUDS_IMAGE, CLOUDS_IMAGE_HEIGHT, CLOUDS_IMAGE_WDITH, CLOUDS_SPEED, DEFAULT_GAME_HEIGHT, DEFAULT_GAME_WIDTH, DEFAULT_OBJECT_SPEED } from "./constants";

export default class Clouds {
    private ctx: CanvasRenderingContext2D; 
    private height: number;
    private width: number;
    private speed: number;
    private scaleRatio: number;
    private x: number;
    private y:  number;
    private image: CanvasImageSource;

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
        this.ctx = ctx;

        this.scaleRatio = scaleRatio;
        this.height = DEFAULT_GAME_HEIGHT * scaleRatio;
        this.width = DEFAULT_GAME_WIDTH * scaleRatio;
        this.speed = CLOUDS_SPEED;

        this.x = 0;
        this.y = 0;

        this.image = new Image();
        this.image.src = CLOUDS_IMAGE;
    }

    update(gameSpeed: number, deltaTime: number): void {
        this.x -= gameSpeed * deltaTime * this.speed * this.scaleRatio;

        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    draw(): void {
        this.ctx.drawImage(
            this.image, 
            0, 0, CLOUDS_IMAGE_WDITH, CLOUDS_IMAGE_HEIGHT,
            this.x, this.y, this.width, this.height
        );
        this.ctx.drawImage(
            this.image, 
            0, 0, CLOUDS_IMAGE_WDITH, CLOUDS_IMAGE_HEIGHT,
            this.x + this.width, this.y, this.width, this.height
        );    
    }

    reset(): void {
        this.x = 0;
    }
}