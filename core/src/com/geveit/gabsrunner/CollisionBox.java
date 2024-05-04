package com.geveit.gabsrunner;

public class CollisionBox {
    public float x, y, width, height;

    public CollisionBox(float x, float y, float width, float height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public boolean isCollidingWith(CollisionBox target) {
        return target.x < this.x + this.width &&
                target.x + target.width > this.x &&
                target.y <  this.y + this.height &&
                target.y + target.height > this.y;
    }
}
