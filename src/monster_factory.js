"use strict";

function create_knight(grid_map) {
    var appearance = "rgba(127, 127, 255, 0.8)";
    var knight = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    knight.speed = 1.75;
    knight.damage = 5.0;
    knight.bonus = 10.0;
    knight.life = 150.0;
    knight.type = "knight";

    return knight;
}

function create_footman(grid_map) {
    var appearance = "rgba(127, 0, 255, 0.8)";
    var footman = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    footman.speed = 1.0;
    footman.damage = 2.0;
    footman.bonus = 5.0;
    footman.life = 100.0;
    footman.type = "footman";

    return footman;
}

function create_swordsman(grid_map) {
    var appearance = "rgba(127, 64, 127, 0.8)";
    var swordsman = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    swordsman.speed = 1.5;
    swordsman.damage = 3.5;
    swordsman.bonus = 7.5;
    swordsman.life = 125.0;
    swordsman.type = "swordsman";

    return swordsman;
}

function create_assassin(grid_map) {
    var appearance = "rgba(255, 0, 64, 0.8)";
    var assassin = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    assassin.speed = 2.0;
    assassin.damage = 10.0;
    assassin.bonus = 20.0;
    assassin.life = 75.0;
    assassin.type = "assassin";

    return assassin;
}

class MonsterFactory {
    constructor(grid_map) {
        this.grid_map = grid_map;
        this.max_num_footman = 10;
        this.max_num_swordsman = 8;
        this.max_num_knight = 6;
        this.max_num_assassin = 5;

        this.round = 1;
        this.speed_random_range = 0.25;
    }

    produce() {
        var num_footman = Math.floor(Math.sqrt(this.round)) + 1;
        num_footman = Math.min(num_footman, this.max_num_footman);

        var num_swordsman = Math.floor(Math.sqrt(this.round - 1)) + 1;
        num_swordsman = Math.min(num_swordsman, this.max_num_swordsman);

        var num_knight = Math.floor(Math.sqrt((this.round - 1) * 0.75));
        num_knight = Math.min(num_knight, this.max_num_knight);

        var num_assassin = 0;
        if (this.round > 5) {
            num_assassin = Math.floor(Math.sqrt((this.round - 5) * 0.75));
        }
        num_assassin = Math.min(num_assassin, this.max_num_assassin);

        ++this.round;

        for (var i = 0; i < num_footman; ++i) {
            var footman = create_footman(this.grid_map);
            this.randomize_speed(footman);
            this.grid_map.add_monster(footman);
        }

        for (var i = 0; i < num_swordsman; ++i) {
            var swordsman = create_swordsman(this.grid_map);
            this.randomize_speed(swordsman);
            this.grid_map.add_monster(swordsman);
        }

        for (var i = 0; i < num_knight; ++i) {
            var knight = create_swordsman(this.grid_map);
            this.randomize_speed(knight);
            this.grid_map.add_monster(knight);
        }

        for (var i = 0; i < num_assassin; ++i) {
            var assassin = create_swordsman(this.grid_map);
            this.randomize_speed(assassin);
            this.grid_map.add_monster(assassin);
        }
    }

    randomize_speed(monster) {
        var sign = Math.round(Math.random());
        var factor = Math.pow(-1, sign) * Math.random() * this.speed_random_range;
        monster.speed *= (1.0 + factor);
    }


}
