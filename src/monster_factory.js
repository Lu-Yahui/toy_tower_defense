"use strict";

function create_knight(grid_map) {
    var appearance = "rgba(127, 127, 255, 0.8)";
    var knight = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    knight.speed = 3.0;
    knight.damage = 5.0;
    knight.bonus = 10.0;
    knight.life = 150.0;

    return knight;
}

function create_footman(grid_map) {
    var appearance = "rgba(127, 0, 255, 0.8)";
    var footman = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    footman.speed = 1.0;
    footman.damage = 2.0;
    footman.bonus = 5.0;
    footman.life = 100.0;

    return footman;
}

function create_swordsman(grid_map) {
    var appearance = "rgba(127, 64, 127, 0.8)";
    var swordsman = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    swordsman.speed = 1.5;
    swordsman.damage = 3.5;
    swordsman.bonus = 7.5;
    swordsman.life = 125.0;

    return swordsman;
}

function create_assassin(grid_map) {
    var appearance = "rgba(255, 0, 64, 0.8)";
    var assassin = new Monster(0, 0, grid_map.grid_cols - 1, grid_map.grid_rows - 1, grid_map, appearance);
    assassin.speed = 4.0;
    assassin.damage = 10.0;
    assassin.bonus = 20.0;
    assassin.life = 75.0;

    return assassin;
}
