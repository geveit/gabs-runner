package com.geveit.gabsrunner.player;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.geveit.gabsrunner.Config;

public class PlayerRenderer {
    private final PlayerAnimation runAnimation;
    private final PlayerAnimation jumpUpAnimation;
    private final PlayerAnimation jumpDownAnimation;

    private PlayerAnimation currentAnimation;
    private float stateTime;

    public PlayerRenderer() {
        runAnimation = new PlayerAnimation(Config.Player.Textures.Run.FILE,
                Config.Player.Textures.Run.ROWS,
                Config.Player.Textures.Run.COLUMNS);

        jumpUpAnimation = new PlayerAnimation(Config.Player.Textures.JumpUp.FILE,
                Config.Player.Textures.JumpUp.ROWS,
                Config.Player.Textures.JumpUp.COLUMNS);

        jumpDownAnimation = new PlayerAnimation(Config.Player.Textures.JumpDown.FILE,
                Config.Player.Textures.JumpDown.ROWS,
                Config.Player.Textures.JumpDown.COLUMNS);

        currentAnimation = runAnimation;
    }

    public void update(Player player) {
        stateTime += Gdx.graphics.getDeltaTime();

        if (player.grounded) {
            currentAnimation = runAnimation;
        } else if (player.velocity.y > 0) {
            currentAnimation = jumpUpAnimation;
        } else {
            currentAnimation = jumpDownAnimation;
        }
    }

    public void render(Player player, SpriteBatch spriteBatch) {
        spriteBatch.draw(currentAnimation.getCurrentFrame(stateTime), player.position.x, player.position.y);
    }

    public void dispose() {
        runAnimation.dispose();
        jumpDownAnimation.dispose();
        jumpUpAnimation.dispose();
    }

    private void changeCurrentAnimation(PlayerAnimation animation) {
        stateTime = 0;
        currentAnimation = animation;
    }
}
