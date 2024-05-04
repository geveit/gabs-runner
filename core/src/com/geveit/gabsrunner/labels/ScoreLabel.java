package com.geveit.gabsrunner.labels;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.utils.Align;
import com.geveit.gabsrunner.Config;

public class ScoreLabel {
    private final Label label;

    public ScoreLabel() {
        Label.LabelStyle style = new Label.LabelStyle();
        style.font = FontProvider.getFont();
        label = new Label("Score: 0", style);
        label.setFontScale(0.7f);
        label.setAlignment(Align.topRight);
        label.setWidth(Config.GAME_WIDTH);
        label.setHeight(Config.GAME_HEIGHT);
        label.setPosition(0, 0);
    }

    public void setValue(String value) {
        label.setText("Score: " + value);
    }

    public void draw(SpriteBatch spriteBatch) {
        label.draw(spriteBatch, 1);
    }
}
