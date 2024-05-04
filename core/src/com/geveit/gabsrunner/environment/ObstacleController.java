package com.geveit.gabsrunner.environment;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.geveit.gabsrunner.CollisionBox;
import com.geveit.gabsrunner.Config;
import com.geveit.gabsrunner.player.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class ObstacleController {
    private float nextObjectInterval;
    private List<Obstacle> obstacles;

    public ObstacleController() {
        setNextObjectInterval();
        obstacles = new ArrayList<>();
    }

    public void update(float gameSpeed) {
        if (nextObjectInterval < 0) {
            createObstacle();
            setNextObjectInterval();
        }

        nextObjectInterval -= Gdx.graphics.getDeltaTime();

        obstacles.forEach(o -> o.update(gameSpeed));

        cleanPastObstacles();
    }

    public void render(ShapeRenderer shapeRenderer) {
        obstacles.forEach(o -> o.render(shapeRenderer));
    }

    public boolean isPlayerHit(Player player) {
        CollisionBox playerBox = player.getCollisionBox();
        return obstacles.stream().anyMatch(o -> o.getCollisionBox().isCollidingWith(playerBox));
    }

    public void reset() {
        obstacles = new ArrayList<>();
        nextObjectInterval = 0;
    }

    private void createObstacle() {
        float width = Config.Obstacles.WIDTH;
        float height = randomBetween(Config.Obstacles.MIN_HEIGHT, Config.Obstacles.MAX_HEIGHT);
        float x = Config.GAME_WIDTH * 1.5f;
        float y = Config.Ground.HEIGHT;
        Color color = Color.BLACK;
        Obstacle obstacle = new Obstacle(x, y, width, height, color);
        obstacles.add(obstacle);
    }

    private void cleanPastObstacles() {
        obstacles = obstacles.stream().filter(o -> o.position.x > -o.width).collect(Collectors.toList());
    }

    private void setNextObjectInterval() {
        nextObjectInterval = randomBetween(Config.Obstacles.MIN_INTERVAL, Config.Obstacles.MAX_INTERVAL);
    }

    private float randomBetween(float min, float max) {
        Random rand = new Random();
        return rand.nextFloat(max - min) + min;
    }
}
