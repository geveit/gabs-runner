export const DEFAULT_GAME_WIDTH = 800;
export const DEFAULT_GAME_HEIGHT = 350;

export const DEFAULT_PLAYER_WIDTH = 32;
export const DEFAULT_PLAYER_HEIGHT = 32;
export const DEFAULT_MAX_JUMP_HEIGHT = 320;
export const DEFAULT_MIN_JUMP_HEIGHT = 100;
export const DEFAULT_PLAYER_X = 80;
export const PLAYER_SCALE = 1.8;
export const RUN_ANIMATION_TIMER = 80;
export const PLAYER_JUMP_SPEED = 0.8;
export const GRAVITY = 0.4;

export const DEFAULT_GROUND_WIDTH = 2000;
export const DEFAULT_GROUND_HEIGHT = 50;

export const DEFAULT_OBJECT_SPEED = 0.5;
export const GAME_SPEED_START = 0.8;
export const GAME_SPEED_INCREMENT = 0.00003;

export const OBSTACLE_INTERVAL_MIN = 700;
export const OBSTACLE_INTERVAL_MAX = 1700;
export const OBSTACLE_SCALE = 1.5;

export const PLAYER_JUMP_IMAGE = "images/player_jump.png";
export const PLAYER_RUN_IMAGE = "images/player_run.png";
export const GROUND_IMAGE = "images/ground.png";

export const COLLISION_TOLLERANCE = 1.4;

export const GAMEOVER_FONT_SIZE = 70;
export const WAITING_TO_START_FONT_SIZE = 40;
export const SCORE_FONT_SIZE = 20;
export const SCORE_FONT_FAMILY = "serif";
export const SCORE_FONT_COLOR = "#525250";
export const FONT_FAMILY = "Verdana";
export const FONT_COLOR = "gray";

export const SCORE_INCREMENT = 0.01;

export const CLOUDS_IMAGE = "images/clouds.png";
export const CLOUDS_IMAGE_WDITH = 576;
export const CLOUDS_IMAGE_HEIGHT = 324;
export const CLOUDS_SPEED = 0.02;

export const OBSTACLES_CONFIG = [
    { width: 45 * OBSTACLE_SCALE, height: 45 * OBSTACLE_SCALE, image: "images/box_1.png" },
    { width: 35 * OBSTACLE_SCALE, height: 35 * OBSTACLE_SCALE, image: "images/box_2.png" },
    { width: 45 * OBSTACLE_SCALE, height: 90 * OBSTACLE_SCALE, image: "images/box_3.png" },
]