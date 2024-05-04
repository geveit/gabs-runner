package com.geveit.gabsrunner.labels;

import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.geveit.gabsrunner.Config;

public class MainLabel {
    private final Label label;
    private boolean showing;

    public MainLabel() {
        Label.LabelStyle style = new Label.LabelStyle();
        style.font = FontProvider.getFont();
        label = new Label("", style);
        label.setFontScale(Config.MainLabel.FONT_SCALE);
        label.setAlignment(Config.MainLabel.ALIGNMENT);
        label.setWidth(Config.GAME_WIDTH);
        label.setPosition(0, Config.MainLabel.Y);
        showing = false;
    }

    public void show() {
        showing = true;
    }

    public void hide() {
        showing = false;
    }

    public void setText(String text) {
        label.setText(text);
    }

    public void draw(SpriteBatch spriteBatch) {
        if (showing) {
            label.draw(spriteBatch, 1);
        }
    }
}