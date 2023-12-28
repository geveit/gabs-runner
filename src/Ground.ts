import { DEFAULT_GROUND_HEIGHT, DEFAULT_GROUND_WIDTH, DEFAULT_OBJECT_SPEED, GROUND_IMAGE } from "./constants";

export default class Ground {
    private ctx: CanvasRenderingContext2D; 
    private height: number;
    private width: number;
    private speed: number;
    private scaleRatio: number;
    private x: number;
    private y:  number;
    private image: CanvasImageSource;

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number, gameHeight: number) {
        this.ctx = ctx;

        this.scaleRatio = scaleRatio;
        this.height = DEFAULT_GROUND_HEIGHT * scaleRatio;
        this.width = DEFAULT_GROUND_WIDTH * scaleRatio;
        this.speed = DEFAULT_OBJECT_SPEED;

        this.x = 0;
        this.y = gameHeight - this.height;

        this.image = new Image();
        this.image.src = GROUND_IMAGE;
    }

    update(gameSpeed: number, deltaTime: number): void {
        this.x -= gameSpeed * deltaTime * this.speed * this.scaleRatio;

        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    draw(): void {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);    
    }

    reset(): void {
        this.x = 0;
    }
}