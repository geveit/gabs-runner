export default class SpriteAnimation {
    private readonly image: CanvasImageSource;
    private readonly frames: number;
    private currentFrame: number;
    private readonly frameHeight: number;
    private readonly frameWidth: number;

    constructor(imageSource: string, frames: number, frameHeight: number, frameWidth: number) {
        this.image = new Image();
        this.image.src = imageSource;

        this.frames = frames;
        this.currentFrame = 1;
        this.frameHeight = frameHeight;
        this.frameWidth = frameWidth;
    }

    updateFrame(): void {
        if (this.currentFrame < this.frames - 1) {
            this.currentFrame++;
        }
        else {
            this.currentFrame = 0;
        }
    }

    reset(): void {
        this.currentFrame = 0;
    }

    draw(ctx: CanvasRenderingContext2D, spriteX: number, spriteY: number, spriteWidth: number, spriteHeight: number): void {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
            spriteX, spriteY, spriteWidth, spriteHeight
        );
    }
}