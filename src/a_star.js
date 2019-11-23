"use strict"

class PathNode {
    constructor(x, y, parent, g_cost, h_cost) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.g_cost = g_cost;
        this.h_cost = h_cost;
    }
}

class AStarPathPlanner {
    constructor(g_ratio, h_ratio, grid_map, interpolation_tolerance = 3) {
        this.g_ratio = g_ratio;
        this.h_ratio = h_ratio;

        this.grid_map = grid_map;
        this.map_width = this.grid_map.grid_cols;
        this.map_height = this.grid_map.grid_rows;

        this.interpolation_tolerance = interpolation_tolerance;

    }

    search_path(start_px, start_py, end_px, end_py) {
        var start_grid = pixel_to_grid(start_px, start_py);
        var end_grid = pixel_to_grid(end_px, end_py);

        var pixel_path = []
        var grid_path = this.search_grid_path(start_grid.x, start_grid.y, end_grid.x, end_grid.y);
        if (grid_path.length == 0) {
            pixel_path = this.interpolate_pixel_to_pixel(start_px, start_py, end_px, end_py);
        }
        else {
            for (var i = grid_path.length - 1; i > 0; --i) {
                var path = this.interpolate_grid_to_grid(
                    grid_path[i].x, grid_path[i].y,
                    grid_path[i - 1].x, grid_path[i - 1].y);
                pixel_path = pixel_path.concat(path);
            }

            var start_grid = grid_path[grid_path.length - 1];
            var end_grid = grid_path[0];
            var prefix_pixel_path = this.interpolate_pixel_to_grid(start_px, start_py, start_grid.x, start_grid.y);
            var suffix_pixel_path = this.interpolate_grid_to_pixel(end_grid.x, end_grid.y, end_px, end_py);

            pixel_path = prefix_pixel_path.concat(pixel_path);
            pixel_path = pixel_path.concat(suffix_pixel_path);
        }
        return pixel_path;
    }

    search_grid_path(start_gx, start_gy, end_gx, end_gy) {
        var open_set = [];
        var close_set = [];

        open_set.push(
            new PathNode(start_gx, start_gy, null, 0.0, 0.0)
        );

        var path_found = false;
        var destination_node = null;
        while (open_set.length !== 0) {
            open_set.sort((lhs, rhs) => {
                var lhs_total = this.compute_total_cost(lhs);
                var rhs_total = this.compute_total_cost(rhs);
                if (lhs_total > rhs_total) {
                    return 1;
                }
                if (lhs_total > rhs_total) {
                    return -1;
                }
                return 0;
            });

            var current = open_set.shift();
            close_set.push(current);

            if (this.destination_arrived(current, end_gx, end_gy)) {
                destination_node = current;
                path_found = true;
                break;
            }

            var neighbours = this.get_neighbours(current, end_gx, end_gy);
            for (var i = 0; i < neighbours.length; ++i) {
                var close_set_index = this.index_of(close_set, neighbours[i]);
                // neighbour in close set
                if (close_set_index !== -1) {
                    continue;
                }
                else {
                    var open_set_index = this.index_of(open_set, neighbours[i]);
                    // neighbour in open set
                    if (open_set_index != -1) {
                        if (neighbours[i].g_cost < open_set[open_set_index].g_cost) {
                            open_set[open_set_index].g_cost = neighbours[i].g_cost;
                        }
                    }
                    else {
                        open_set.push(neighbours[i]);
                    }
                }
            }
        }

        var path = [];
        if (!path_found) {
            return path;
        }

        while (current != null) {
            path.push({
                x: current.x,
                y: current.y
            });

            current = current.parent;
        }

        return path;
    }

    interpolate_grid_to_grid(start_gx, start_gy, end_gx, end_gy) {
        var start_pixel = grid_to_pixel(start_gx, start_gy);
        var end_pixel = grid_to_pixel(end_gx, end_gy);
        return this.interpolate_pixel_to_pixel(start_pixel.x, start_pixel.y, end_pixel.x, end_pixel.y);
    }

    interpolate_pixel_to_grid(start_px, start_py, end_gx, end_gy) {
        var end_pixel = grid_to_pixel(end_gx, end_gy);
        return this.interpolate_pixel_to_pixel(start_px, start_py, end_pixel.x, end_pixel.y);
    }

    interpolate_grid_to_pixel(start_gx, start_gy, end_px, end_py) {
        var start_pixel = grid_to_pixel(start_gx, start_gy);
        return this.interpolate_pixel_to_pixel(start_pixel.x, start_pixel.y, end_px, end_py);
    }

    interpolate_pixel_to_pixel(start_px, start_py, end_px, end_py) {
        var start_pixel = {
            x: start_px,
            y: start_py
        };

        var end_pixel = {
            x: end_px,
            y: end_py
        };

        var diff_px = Math.abs(start_pixel.x - end_pixel.x);
        var diff_py = Math.abs(start_pixel.y - end_pixel.y);

        var pixel_path = [];
        if (diff_px < diff_py && diff_px <= this.interpolation_tolerance) {
            var px = Math.floor(0.5 * (start_pixel.x + end_pixel.x));
            var step = 1;
            if (start_pixel.y > end_pixel.y) {
                step = -1;
            }
            for (var py = start_pixel.y; py != end_pixel.y; py += step) {
                pixel_path.push({
                    x: px,
                    y: py
                });
            }
        }
        else if (diff_px >= diff_py && diff_py <= this.interpolation_tolerance) {
            var py = Math.floor(0.5 * (start_pixel.y + end_pixel.y));
            var step = 1;
            if (start_pixel.x > end_pixel.x) {
                step = -1;
            }
            for (var px = start_pixel.x; px != end_pixel.x; px += step) {
                pixel_path.push({
                    x: px,
                    y: py
                });
            }
        }

        return pixel_path;
    }

    compute_path_key(start_gx, start_gy, end_gx, end_gy) {
        var start_index = this.grid_map.linearize_grid_index(start_gx, start_gy);
        var end_index = this.grid_map.linearize_grid_index(end_gx, end_gy);
        var key = start_index.toString() + end_index.toString();
        return key;
    }

    destination_arrived(path_node, end_gx, end_gy) {
        return path_node.x === end_gx && path_node.y === end_gy;
    }

    compute_total_cost(path_node) {
        return this.g_ratio * path_node.g_cost + this.h_ratio * path_node.h_cost;
    }

    index_of(container, path_node) {
        var index = -1;
        for (var i = 0; i < container.length; ++i) {
            if (container[i].x === path_node.x && container[i].y === path_node.y) {
                index = i;
                break;
            }
        }

        return index;
    }

    get_neighbours(path_node, end_gx, end_gy) {
        var neighbours = [];
        if (path_node.x - 1 >= 0) {
            var x = path_node.x - 1;
            var y = path_node.y;
            if (!this.grid_map.is_grid_occupied(x, y)) {
                var g_cost = path_node.g_cost + 1;
                var h_cost = Math.abs(x - end_gx) + Math.abs(y - end_gy);
                neighbours.push(new PathNode(x, y, path_node, g_cost, h_cost));
            }
        }

        if (path_node.x + 1 < this.map_width) {
            var x = path_node.x + 1;
            var y = path_node.y;
            if (!this.grid_map.is_grid_occupied(x, y)) {
                var g_cost = path_node.g_cost + 1;
                var h_cost = Math.abs(x - end_gx) + Math.abs(y - end_gy);
                neighbours.push(new PathNode(x, y, path_node, g_cost, h_cost));
            }
        }

        if (path_node.y - 1 >= 0) {
            var x = path_node.x;
            var y = path_node.y - 1;
            if (!this.grid_map.is_grid_occupied(x, y)) {
                var g_cost = path_node.g_cost + 1;
                var h_cost = Math.abs(x - end_gx) + Math.abs(y - end_gy);
                neighbours.push(new PathNode(x, y, path_node, g_cost, h_cost));
            }
        }

        if (path_node.y + 1 < this.map_height) {
            var x = path_node.x;
            var y = path_node.y + 1;
            if (!this.grid_map.is_grid_occupied(x, y)) {
                var g_cost = path_node.g_cost + 1;
                var h_cost = Math.abs(x - end_gx) + Math.abs(y - end_gy);
                neighbours.push(new PathNode(x, y, path_node, g_cost, h_cost));
            }
        }

        return neighbours;
    }
}
