class LaserGun {
    constructor(gx, gy) {
        this.gx = gx;
        this.gy = gy;
        var pixel = grid_to_pixel(this.gx, this.gy);
        this.px = pixel.x;
        this.py = pixel.y;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("rgba(255, 0, 0, 0.9)").drawCircle(0, 0, config.map.resolution * 0.5 - 1);
        this.shape.x = this.px;
        this.shape.y = this.py;
        this.damage = config.weapons.laser_gun.damage;
        this.range = config.weapons.laser_gun.range;
    }

    hit(monsters) {
        var if_empty = 1;
        for (var i = 0; i < monsters.length; ++i) {
            var monster = monsters[i];
            if (Math.sqrt(Math.pow(this.px - monster.current_px, 2) + Math.pow(this.py - monster.current_py, 2)) <= this.range * config.map.resolution) {
                monster.life = monster.life - this.damage;
                if_empty = 0;
                return [this.px, this.py, monster.current_px, monster.current_py]
            }
        }
        if (if_empty == 1) {
            return 0;
        }
    }
}