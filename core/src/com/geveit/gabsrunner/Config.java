package com.geveit.gabsrunner;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.utils.Align;

public class Config {
    public final static float GRAVITY = 1500;
    public final static float FLOOR_LEVEL = 40;
    public final static int GAME_HEIGHT = 480;
    public final static int GAME_WIDTH = 720;
    public final static float INITIAL_GAME_SPEED = 500;
    public final static float GAME_SPEED_INCREMENT = 2;

    public static class Player {
        public final static float JUMP_VELOCITY = 500;
        public final static float MAX_JUMP_TIME = 0.4f;
        public final static float HEIGHT = 65;
        public final static float WIDTH = 40;

        public static class InitialPosition {
            public final static float X = 100;
            public final static float Y = 100;
        }

        public static class Textures {
            public static class Run {
                public final static String FILE = "Run.png";
                public final static int ROWS = 1;
                public final static int COLUMNS = 9;
            }
            public static class JumpUp {
                public final static String FILE = "JumpUp.png";
                public final static int ROWS = 1;
                public final static int COLUMNS = 1;
            }
            public static class JumpDown {
                public final static String FILE = "JumpDown.png";
                public final static int ROWS = 1;
                public final static int COLUMNS = 1;
            }
        }
    }

    public static class Ground {
        public final static float WIDTH = 720;
        public final static float HEIGHT = 43;
        public final static float SPEED_MODIFIER = 50;
        public final static Color COLOR = Color.BLACK;
    }

    public static class Animations {
        public final static float FRAME_DURATION = 0.05f;
    }

    public static class Obstacles {
        public final static float MAX_INTERVAL = 6;
        public final static float MIN_INTERVAL = 1;
        public final static float WIDTH = 50;
        public final static float MAX_HEIGHT = 200;
        public final static float MIN_HEIGHT = 40;
    }

    public static class Font {
        public final static String FILE = "font.ttf";
        public final static int SIZE = 48;
        public final static Color COLOR = Color.BLACK;
    }

    public static class MainLabel {
        public final static float FONT_SCALE = 1;
        public final static int ALIGNMENT = Align.center;
        public final static float X = (float) Config.GAME_WIDTH / 3.5f;
        public final static float Y = (float) Config.GAME_HEIGHT / 2;
    }
}
