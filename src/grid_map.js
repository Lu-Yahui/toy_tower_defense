class GridMap {
    constructor(stage) {
        this.stage = stage;

        this.resolution = config.map.resolution;
        this.height = config.map.height;
        this.width = config.map.width;

        this.x_n_grids = this.width / this.resolution;
        this.y_n_grids = this.height / this.resolution;

        this.grids = []

        this.barriers = [];
        this.weapons = []
        this.monsters = []

        this.padding_x = config.map.padding_x;
        this.padding_y = config.map.padding_y;

        this.initialize_map()
    }

    initialize_map() {
        // draw grids
        for (var row = 0; row < this.y_n_grids + 1; ++row) {
            var line = new createjs.Shape();
            this.stage.addChild(line);
            line.graphics.setStrokeStyle(1).beginStroke("rgba(0, 0, 0, 0.5)")

            var start_x = this.padding_x;
            var start_y = this.padding_y + this.resolution * row;
            line.graphics.moveTo(start_x, start_y);

            var end_x = this.padding_x + this.width;
            var end_y = start_y;
            line.graphics.lineTo(end_x, end_y);
            line.graphics.endStroke();
        }
        for (var col = 0; col < this.x_n_grids + 1; ++col) {
            var line = new createjs.Shape();
            this.stage.addChild(line);
            line.graphics.setStrokeStyle(1).beginStroke("rgba(0, 0, 0, 0.5)")

            var start_x = this.padding_x + this.resolution * col;
            var start_y = this.padding_y;
            line.graphics.moveTo(start_x, start_y);

            var end_x = start_x;
            var end_y = this.padding_y + this.height;
            line.graphics.lineTo(end_x, end_y);
            line.graphics.endStroke();
        }

        // draw start point
        var start = new createjs.Shape();
        start.graphics.beginFill("rgba(127, 127, 127, 0.75)").drawCircle(0, 0, this.resolution * 0.5 - 1);
        start.x = this.padding_x + this.resolution * 0.5;
        start.y = this.padding_y + this.resolution * 0.5;
        this.stage.addChild(start);

        // draw destination point
        var dest = new createjs.Shape();
        dest.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.resolution * 0.5 - 1);
        dest.x = this.padding_x + this.width - this.resolution * 0.5;
        dest.y = this.padding_y + this.height - this.resolution * 0.5;
        this.stage.addChild(dest);
    }

    add_barrier(grid_x, grid_y) {
        var barrier = new Barrier(grid_x, grid_y);
        this.barriers.push(barrier);
        this.stage.addChild(barrier.shape);
    }

    add_laser_gun(grid_x, grid_y) {
        var laser_gun = new LaserGun(grid_x, grid_y);
        this.weapons.push(laser_gun);
        this.stage.addChild(laser_gun.shape);
    }

    add_monster(grid_x, grid_y) {
        var monster = new Monster(grid_x, grid_y, this.x_n_grids - 1, this.y_n_grids - 1, this);
        this.monsters.push(monster);
        this.stage.addChild(monster.shape);
    }

    is_grid_occupied(px, py) {
        var grid = pixel_to_grid(px, py);
        for (var i = 0; i < this.barriers.length; ++i) {
            var barrier = this.barriers[i];
            if (grid.x == barrier.gx && grid.y == barrier.gy) {
                return true;
            }
        }

        for (var i = 0; i < this.weapons.length; ++i) {
            var weapon = this.weapons[i];
            if (grid.x == weapon.gx && grid.y == weapon.gy) {
                return true;
            }
        }

        return false;
    }

    update() {
        for (var i = 0; i < this.monsters.length; ++i) {
            var monster = this.monsters[i];
            monster.move();
        }

        this.stage.update();
    }
}
