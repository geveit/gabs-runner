package com.geveit.gabsrunner.environment;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.math.Vector2;
import com.geveit.gabsrunner.Config;

public class Ground {
    public final float height = Config.Ground.HEIGHT, width = Config.Ground.WIDTH;
    public float speedModifier = Config.Ground.SPEED_MODIFIER;
    public Color color = Config.Ground.COLOR;
    public Vector2 position = new Vector2();

    public void update(float gameSpeed) {
        position.x -= speedModifier * gameSpeed * Gdx.graphics.getDeltaTime();

        if (position.x < -width) {
            position.x = 0;
        }
    }

    public void render(ShapeRenderer shapeRenderer) {
        shapeRenderer.setColor(color);
        shapeRenderer.rect(position.x, position.y, width, height);
        shapeRenderer.rect(position.x + width, position.y, width, height);
    }

    public void reset() {
        position = new Vector2();
    }
}
