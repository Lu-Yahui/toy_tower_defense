function grid_to_pixel(grid_x, grid_y) {
    var px = config.map.padding_x + (grid_x + 0.5) * config.map.resolution
    var py = config.map.padding_y + (grid_y + 0.5) * config.map.resolution
    return { x: Math.floor(px), y: Math.floor(py) };
}

function pixel_to_grid(px, py) {
    var gx = (px - config.map.padding_x) / config.map.resolution;
    var gy = (py - config.map.padding_y) / config.map.resolution;
    return { x: Math.floor(gx), y: Math.floor(gy) };
}