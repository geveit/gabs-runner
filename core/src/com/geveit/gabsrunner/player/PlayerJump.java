package com.geveit.gabsrunner.player;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.math.Vector2;
import com.geveit.gabsrunner.Config;

public class PlayerJump {
    private float jumpTimer = 0;
    private boolean holdingJump = false;

    public void jump(Player player) {
        if (player.grounded) {
            if (Gdx.input.isKeyJustPressed(Input.Keys.SPACE)) {
                player.grounded = false;
                player.velocity.y = Config.Player.JUMP_VELOCITY;
                holdingJump = true;
            }
        } else {
            if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
                jumpTimer += Gdx.graphics.getDeltaTime();
                if (jumpTimer >= Config.Player.MAX_JUMP_TIME) {
                    holdingJump = false;
                }
            } else {
                holdingJump = false;
            }

            Vector2 newPos = player.position.cpy();

            newPos.y += player.velocity.y * Gdx.graphics.getDeltaTime();
            if (!holdingJump) {
                player.velocity.y -= Config.GRAVITY * Gdx.graphics.getDeltaTime();
            }

            if (newPos.y < Config.FLOOR_LEVEL) {
                newPos.y = Config.FLOOR_LEVEL;
                player.velocity.y = 0;
                player.grounded = true;
                jumpTimer = 0;
            }

            player.position = newPos.cpy();
        }
    }
}
