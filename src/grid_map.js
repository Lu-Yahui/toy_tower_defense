"use strict";

class GridMap {
    constructor(stage) {
        this.stage = stage;

        this.resolution = config.map.resolution;
        this.height = config.map.height;
        this.width = config.map.width;

        this.grid_rows = Math.floor(this.height / this.resolution);
        this.grid_cols = Math.floor(this.width / this.resolution);

        this.grids = [];
        this.occupied_grids = [];

        this.barriers = [];
        this.weapons = []
        this.monsters = []

        this.padding_x = config.map.padding_x;
        this.padding_y = config.map.padding_y;

        this.initialize_map()

        this.path_finder = new PathFinder(this);
        this.player = new Player(100, 500);
    }

    initialize_map() {
        // draw grids
        for (var row = 0; row < this.grid_rows + 1; ++row) {
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
        for (var col = 0; col < this.grid_cols + 1; ++col) {
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
        var start_pixel = grid_to_pixel(0, 0);
        start.x = start_pixel.x;
        start.y = start_pixel.y;
        this.stage.addChild(start);

        // draw destination point
        var dest = new createjs.Shape();
        dest.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.resolution * 0.5 - 1);
        var dest_pixel = grid_to_pixel(this.grid_cols - 1, this.grid_rows - 1);
        dest.x = dest_pixel.x;
        dest.y = dest_pixel.y;
        this.stage.addChild(dest);
    }

    add_barrier(grid_x, grid_y) {
        if (this.is_grid_occupied(grid_x, grid_y)) {
            return false;
        }

        var barrier = new Barrier(grid_x, grid_y);
        this.barriers.push(barrier);
        this.occupied_grids.push(this.linearize_grid_index(grid_x, grid_y));

        if (!this.path_finder.is_path_existing()) {
            this.barriers.pop();
            this.occupied_grids.pop();
            return false;
        }

        this.trigger_monsters_recompute_path();

        this.stage.addChild(barrier.shape);

        return true;
    }

    add_laser_gun(grid_x, grid_y) {
        if (this.is_grid_occupied(grid_x, grid_y)) {
            return false;
        }

        var laser_gun = new LaserGun(grid_x, grid_y, this);
        this.weapons.push(laser_gun);
        this.occupied_grids.push(this.linearize_grid_index(grid_x, grid_y));

        if (!this.path_finder.is_path_existing()) {
            this.weapons.pop();
            this.occupied_grids.pop();
            return false;
        }

        this.trigger_monsters_recompute_path();

        this.stage.addChild(laser_gun.shape);

        return true;
    }

    add_monster(grid_x, grid_y, speed = 1) {
        var monster = new Monster(grid_x, grid_y, this.grid_cols - 1, this.grid_rows - 1, this);
        monster.set_speed(speed);
        this.monsters.push(monster);
        this.stage.addChild(monster.shape);
    }

    is_grid_occupied(gx, gy) {
        var grid_index = this.linearize_grid_index(gx, gy);
        var found_index = this.occupied_grids.indexOf(grid_index);
        return found_index !== -1;
    }

    linearize_grid_index(gx, gy) {
        return this.grid_cols * gy + gx;
    }

    trigger_monsters_recompute_path() {
        for (var i = 0; i < this.monsters.length; ++i) {
            this.monsters[i].recompute_path();
        }
    }

    update() {
        this.update_monsters();
        this.update_weapons();
        this.update_player_info();
        this.update_stage();
    }

    update_monsters() {
        for (var i = 0; i < this.monsters.length; ++i) {
            var monster = this.monsters[i];
            if (monster.life <= 0) {
                this.monsters.splice(i, 1)
                this.stage.removeChild(monster.shape);
            }
            else {
                monster.move();
            }
        }
    }

    update_weapons() {
        for (var i = 0; i < this.weapons.length; ++i) {
            this.weapons[i].hit(this.monsters);
        }
    }

    update_stage() {
        this.stage.update();
    }

    update_player_info() {
        // TODO: update player info here, e.g. life, money, etc.
        console.log(`Player life: ${this.player.life}.`);
        console.log(`Player money: ${this.player.money}.`);
    }
}