package com.geveit.gabsrunner.player;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Vector2;
import com.geveit.gabsrunner.Collider;
import com.geveit.gabsrunner.CollisionBox;
import com.geveit.gabsrunner.Config;

public class Player implements Collider {
    public float width = Config.Player.WIDTH, height = Config.Player.HEIGHT;
    public Vector2 position = new Vector2(Config.Player.InitialPosition.X, Config.Player.InitialPosition.Y);

    public Vector2 velocity = new Vector2();
    public boolean grounded = false;

    private final PlayerJump playerJump = new PlayerJump();
    private final PlayerRenderer renderer = new PlayerRenderer();

    public void render(SpriteBatch spriteBatch) {
        renderer.render(this, spriteBatch);
    }

    public void update() {
        playerJump.jump(this);
        renderer.update(this);
    }

    public void reset() {
        velocity = new Vector2();
        position = new Vector2(Config.Player.InitialPosition.X, Config.Player.InitialPosition.Y);
        grounded = false;
    }

    public void dispose() {
        renderer.dispose();
    }

    @Override
    public CollisionBox getCollisionBox() {
        return new CollisionBox(position.x, position.y, width, height);
    }
}
