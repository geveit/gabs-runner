import Player from "./Player";
import { COLLISION_TOLLERANCE } from "./constants";

export default class Obstacle {
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private height: number;
    private width: number;
    private image: CanvasImageSource;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, image: CanvasImageSource) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.image = image;
    }

    getX(): number {
        return this.x;
    }

    getWidth(): number {
        return this.width;
    }

    update(speed: number, gameSpeed: number, deltaTime: number, scaleRatio: number) {
        this.x -= speed * gameSpeed * deltaTime * scaleRatio;
    }

    draw(): void {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collidingWith(player: Player): boolean {
        const playerBox = player.getCollisionBox();
        return playerBox.x < this.x + this.width / COLLISION_TOLLERANCE &&
                playerBox.x + playerBox.width / COLLISION_TOLLERANCE > this.x &&
                playerBox.y <  this.y + this.height / COLLISION_TOLLERANCE &&
                playerBox.y + playerBox.height / COLLISION_TOLLERANCE > this.y
    }
}