package com.geveit.gabsrunner.player;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.geveit.gabsrunner.Config;

public class PlayerAnimation {
    private final Texture texture;
    private final Animation<TextureRegion> animation;

    public PlayerAnimation(String path, int rows, int columns) {
        texture = new Texture(Gdx.files.internal(path));

        TextureRegion[][] tmp = TextureRegion.split(texture,
                texture.getWidth() / columns,
                texture.getHeight() / rows);

        TextureRegion[] frames = new TextureRegion[columns * rows];
        int index = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                frames[index++] = tmp[i][j];
            }
        }

        animation = new Animation<>(Config.Animations.FRAME_DURATION, frames);
    }

    public TextureRegion getCurrentFrame(float stateTime) {
        return animation.getKeyFrame(stateTime, true);
    }

    public void dispose() {
        texture.dispose();
    }
}
