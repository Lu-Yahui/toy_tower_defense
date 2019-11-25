"use strict";

/**
 * Path finder is used to check if a path is existing, from top left grid to bottom right grid
 */
class PathFinder {
    constructor(grid_map) {
        this.grid_map = grid_map;

        this.start_gx = 0;
        this.start_gy = 0;
        this.end_gx = this.grid_map.grid_cols - 1;
        this.end_gy = this.grid_map.grid_rows - 1;

        this.planner = new AStarPathPlanner(0.5, 0.5, this.grid_map);
    }

    is_path_existing() {
        var grid_path = this.planner.search_grid_path(this.start_gx, this.start_gy, this.end_gx, this.end_gy);
        return grid_path.length !== 0;
    }
}
