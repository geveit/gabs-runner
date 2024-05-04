package com.geveit.gabsrunner.environment;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.math.Vector2;
import com.geveit.gabsrunner.Collider;
import com.geveit.gabsrunner.CollisionBox;

public class Obstacle implements Collider {
    public Vector2 position;
    public final float width, height;
    public final Color color;

    public Obstacle(float x, float y, float width, float height, Color color) {
        this.position = new Vector2(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    public void update(float speed) {
        position.x -= speed * Gdx.graphics.getDeltaTime();
    }

    public void render(ShapeRenderer shapeRenderer) {
        shapeRenderer.setColor(color);
        shapeRenderer.rect(position.x, position.y, width, height);
    }

    @Override
    public CollisionBox getCollisionBox() {
        return new CollisionBox(position.x, position.y, width, height);
    }
}
