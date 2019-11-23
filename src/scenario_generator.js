function make_test_scenario(map) {
    map.add_barrier(2, 0);
    map.add_barrier(2, 1);
    map.add_barrier(2, 2);
    map.add_barrier(2, 3);
    map.add_barrier(2, 4);
    map.add_barrier(2, 5);

    map.add_barrier(5, 5);
    map.add_barrier(5, 6);
    map.add_barrier(5, 7);
    map.add_barrier(4, 7);
    map.add_barrier(3, 7);
    map.add_barrier(1, 7);
    map.add_barrier(0, 7);

    map.add_barrier(1, 8);
    map.add_barrier(3, 8);
    map.add_barrier(1, 9);
    map.add_barrier(3, 9);
    map.add_barrier(2, 10);

    map.add_barrier(1, 14);
    map.add_barrier(2, 14);
    map.add_barrier(3, 14);
    map.add_barrier(4, 14);
    map.add_barrier(5, 14);
    map.add_barrier(6, 14);
    map.add_barrier(7, 14);
    map.add_barrier(8, 14);
    map.add_barrier(9, 14);
    map.add_barrier(10, 14);
    map.add_barrier(3, 15);
    map.add_barrier(3, 16);
    map.add_barrier(3, 17);
    map.add_barrier(3, 18);
    map.add_barrier(5, 19);
    map.add_barrier(5, 18);
    map.add_barrier(5, 17);

    map.add_barrier(6, 8);
    map.add_barrier(7, 9);
    map.add_barrier(8, 10);

    map.add_barrier(11, 14);
    map.add_barrier(12, 15);
    map.add_barrier(13, 16);
    map.add_barrier(14, 17);

    map.add_barrier(17, 14);
    map.add_barrier(16, 14);
    map.add_barrier(15, 14);
    map.add_barrier(14, 14);

    map.add_barrier(19, 10);
    map.add_barrier(18, 10);
    map.add_barrier(17, 10);
    map.add_barrier(16, 10);
    map.add_barrier(15, 10);
    map.add_barrier(14, 10);
    map.add_barrier(13, 10);
    map.add_barrier(12, 10);
    map.add_barrier(11, 10);
    map.add_barrier(11, 11);
    map.add_barrier(11, 12);
    map.add_barrier(11, 13);
    map.add_barrier(17, 19);
    map.add_barrier(17, 18);
    map.add_barrier(17, 17);
    map.add_barrier(17, 16);
    map.add_barrier(17, 15);
    map.add_barrier(17, 14);
    map.add_barrier(17, 13);
    map.add_barrier(17, 12);
    map.add_barrier(19, 15);

    map.add_monster(0, 0, 7);
    map.add_monster(0, 0, 6);
    map.add_monster(0, 0, 5);
    map.add_monster(0, 0, 4);
    map.add_monster(0, 0, 3);
}