class LaserGun {
    constructor(gx, gy, grid_map) {
        this.id = IdGenerator.get_weapon_id();
        this.gx = gx;
        this.gy = gy;
        this.grid_map = grid_map;
        var pixel = grid_to_pixel(this.gx, this.gy);
        this.px = pixel.x;
        this.py = pixel.y;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("rgba(255, 0, 0, 0.9)").drawCircle(0, 0, config.map.resolution * 0.5 - 1);
        this.shape.x = this.px;
        this.shape.y = this.py;
        this.damage = config.weapons.laser_gun.damage;
        this.range = config.weapons.laser_gun.range;
        this.range_squared = this.range * this.range;

        this.target = null;
        this.laser_beam = null;
    }

    hit(monsters) {
        if (this.target !== null) {
            if (this.target.arrived === true || this.target.dead === true)
                if (this.laser_beam !== null) {
                    this.grid_map.stage.removeChild(this.laser_beam);
                }
        }

        this.target = this.look_for_target(monsters);
        if (this.target === null) {
            if (this.laser_beam !== null) {
                this.grid_map.stage.removeChild(this.laser_beam);
            }
            return;
        }

        if (this.laser_beam !== null) {
            this.grid_map.stage.removeChild(this.laser_beam);
        }

        this.laser_beam = new createjs.Shape();
        this.grid_map.stage.addChild(this.laser_beam);
        this.laser_beam.graphics.setStrokeStyle(2).beginStroke("rgba(160, 32, 240, 0.7)")

        this.laser_beam.graphics.moveTo(this.px, this.py);
        this.laser_beam.graphics.lineTo(this.target.current_px, this.target.current_py);
        this.laser_beam.graphics.endStroke();

        this.target.life -= this.damage;
    }

    look_for_target(monsters) {
        var candidates = [];
        for (var i = 0; i < monsters.length; ++i) {
            var monster = monsters[i];
            var distance = Math.sqrt(Math.pow(this.px - monster.current_px, 2) + Math.pow(this.py - monster.current_py, 2));
            if (distance <= this.range * config.map.resolution) {
                candidates.push(monster);
            }
        }

        if (candidates.length === 0) {
            return null;
        }

        candidates.sort((lhs, rhs) => {
            if (lhs.speed > rhs.speed) {
                return -1;
            }
            if (lhs.speed < rhs.speed) {
                return 1;
            }
            return 0;
        });

        return candidates.shift();
    }
}