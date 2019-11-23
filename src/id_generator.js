"use strict";

var IdGenerator = {
    monster_id: 0,
    weapon_id: 0,
    barrier_id: 0,

    get_monster_id: () => {
        return ++IdGenerator.monster_id;
    },

    get_weapon_id: () => {
        return ++IdGenerator.weapon_id;
    },

    get_barrier_id: () => {
        return ++IdGenerator.barrier_id;
    }
}