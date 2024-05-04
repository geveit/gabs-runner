package com.geveit.gabsrunner;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.badlogic.gdx.utils.ScreenUtils;
import com.geveit.gabsrunner.environment.Ground;
import com.geveit.gabsrunner.environment.ObstacleController;
import com.geveit.gabsrunner.labels.MainLabel;
import com.geveit.gabsrunner.labels.ScoreLabel;
import com.geveit.gabsrunner.player.Player;

public class GabsRunner extends ApplicationAdapter {
	private SpriteBatch spriteBatch;
	private ShapeRenderer shapeRenderer;

	private float gameSpeed = Config.INITIAL_GAME_SPEED;

	private Player player;
	private Ground ground;
	private ObstacleController obstacleController;

	private MainLabel mainLabel;

	private boolean gameOver;
	private boolean waitingToStart;

	private float score = 0;
	private ScoreLabel scoreLabel;
	
	@Override
	public void create () {
		player = new Player();
		ground = new Ground();
		obstacleController = new ObstacleController();

		spriteBatch = new SpriteBatch();
		shapeRenderer = new ShapeRenderer();

		gameOver = false;
		waitingToStart = true;

		mainLabel = new MainLabel();
		scoreLabel = new ScoreLabel();
	}

	@Override
	public void render () {
		ScreenUtils.clear(Color.WHITE);

		handleGameStart();

		shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
		ground.render(shapeRenderer);
		obstacleController.render(shapeRenderer);
		shapeRenderer.end();

		spriteBatch.begin();
		mainLabel.draw(spriteBatch);
		scoreLabel.draw(spriteBatch);
		player.render(spriteBatch);
		spriteBatch.end();

		if (!gameOver) {
			player.update();

			if (!waitingToStart) {
				mainLabel.hide();
				gameLoop();
			}
		}

		if (gameOver) {
			showGameover();
		}

		if (waitingToStart) {
			showWaitingToStart();
		}
	}

	private void gameLoop() {
		gameSpeed += Config.GAME_SPEED_INCREMENT * Gdx.graphics.getDeltaTime();
		score += Config.GAME_SPEED_INCREMENT * Gdx.graphics.getDeltaTime();
		scoreLabel.setValue(String.valueOf((int)Math.ceil(score)));

		ground.update(gameSpeed);
		obstacleController.update(gameSpeed);

		if (obstacleController.isPlayerHit(player)) {
			gameOver = true;
		}
	}

	private void handleGameStart() {
		if (Gdx.input.isKeyJustPressed(Input.Keys.SPACE)) {

			if (gameOver) {
				reset();
			}

			if (gameOver || waitingToStart) {
				gameOver = false;
				waitingToStart = false;
				mainLabel.hide();
			}
		}
	}

	private void reset() {
		player.reset();
		ground.reset();
		obstacleController.reset();
		gameSpeed = Config.INITIAL_GAME_SPEED;
		score = 0;
	}

	private void showWaitingToStart() {
		mainLabel.setText("PRESS TO START");
		mainLabel.show();
	}

	private void showGameover() {
		mainLabel.setText("GAME OVER");
		mainLabel.show();
	}
	
	@Override
	public void dispose () {
		spriteBatch.dispose();
		shapeRenderer.dispose();
		player.dispose();
	}
}
