package com.geveit.gabsrunner.labels;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.freetype.FreeTypeFontGenerator;
import com.geveit.gabsrunner.Config;

public class FontProvider {
    private static BitmapFont font;

    public static BitmapFont getFont() {
        if (font == null) {
            createFont();
        }

        return font;
    }

    private static void createFont() {
        FreeTypeFontGenerator generator = new FreeTypeFontGenerator(Gdx.files.internal(Config.Font.FILE));
        FreeTypeFontGenerator.FreeTypeFontParameter parameter = new FreeTypeFontGenerator.FreeTypeFontParameter();
        parameter.size = Config.Font.SIZE;
        parameter.color = Config.Font.COLOR;

        font = generator.generateFont(parameter);

        generator.dispose();
    }
}
