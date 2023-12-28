import Obstacle from "./Obstacle";
import Player from "./Player";
import { DEFAULT_GROUND_HEIGHT, DEFAULT_OBJECT_SPEED, OBSTACLES_CONFIG, OBSTACLE_INTERVAL_MAX, OBSTACLE_INTERVAL_MIN, OBSTACLE_SCALE } from "./constants";

export default class ObstaclesController {
    private ctx: CanvasRenderingContext2D;
    private scaleRatio: number;
    private speed: number;
    private obtacleImages: ObstacleImage[];

    private nextObtstacleInterval: number;
    private obstacles: Obstacle[] = [];

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
        this.ctx = ctx;
        this.scaleRatio = scaleRatio;
        this.speed = DEFAULT_OBJECT_SPEED;

        this.obtacleImages = OBSTACLES_CONFIG.map((obstacle => {
            const image = new Image();
            image.src = obstacle.image;
            return {
                image: image,
                height: obstacle.height * scaleRatio,
                width: obstacle.width * scaleRatio
            }
        }));

        this.setNextObstacleInterval();
    }

    private createObstacle(): void {
        const index = this.getRandomNumberBetween(0, this.obtacleImages.length - 1);
        const obstacleImage = this.obtacleImages[index];
        const x = this.ctx.canvas.width * 1.5;
        const y = this.ctx.canvas.height - obstacleImage.height - DEFAULT_GROUND_HEIGHT * this.scaleRatio;
        const obstacle = new Obstacle(
            this.ctx,
            x,
            y,
            obstacleImage.width,
            obstacleImage.height,
            obstacleImage.image
        );

        this.obstacles.push(obstacle);
    }

    collidingWith(player: Player): boolean {
        return this.obstacles.some(obstacle => obstacle.collidingWith(player));
    }

    update(gameSpeed: number, deltaTime: number): void {
        if (this.nextObtstacleInterval <= 0) {
          this.createObstacle();
          this.setNextObstacleInterval();
        }
        this.nextObtstacleInterval -= deltaTime;
    
        this.obstacles.forEach((obstacle) => {
          obstacle.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
        });
    
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.getX() > -obstacle.getWidth());
    }
    
    draw(): void {
    this.obstacles.forEach((obstacle) => obstacle.draw());
    }

    reset(): void {
        this.obstacles = [];
    }

    private setNextObstacleInterval(): void {
        const nextInterval = this.getRandomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX);
        this.nextObtstacleInterval = nextInterval;
    }

    private getRandomNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

interface ObstacleImage {
    image: CanvasImageSource;
    height: number;
    width: number;
}