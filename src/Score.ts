import { SCORE_FONT_FAMILY, SCORE_FONT_SIZE, SCORE_INCREMENT } from "./constants";

export default class Score {
    private ctx: CanvasRenderingContext2D;
    private scaleRatio: number;
    private score: number = 0;
    private HIGH_SCORE_KEY = "hightScore";

    constructor(ctx: CanvasRenderingContext2D, scaleRatio: number) {
        this.ctx = ctx;
        this.scaleRatio = scaleRatio;
    }

    update(deltaTime: number): void {
        this.score += deltaTime * SCORE_INCREMENT;
    }

    reset(): void {
        this.score = 0;
    }

    setHighScore(): void {
        const hightScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        if (this.score > hightScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, String(Math.floor(this.score)));
        }
    }

    draw() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        const y = 20 * this.scaleRatio;
    
        const fontSize = SCORE_FONT_SIZE * this.scaleRatio;
        this.ctx.font = `${fontSize}px ${SCORE_FONT_FAMILY}`;
        this.ctx.fillStyle = "#525250";
        const scoreX = this.ctx.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;
    
        const scorePadded = Math.floor(this.score).toString().padStart(6, "0");
        const highScorePadded = highScore.toString().padStart(6, "0");
    
        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
      }
}