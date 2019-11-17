class Monster {
    constructor(start_gx, start_gy, dest_gx, dest_gy, grid_map) {
        this.start_gx = start_gx;
        this.start_gy = start_gy;

        this.dest_gx = dest_gx;
        this.dest_gy = dest_gy;

        this.grid_map = grid_map;

        this.dest_px = Math.floor(config.map.padding_x + config.map.width + 0.5 * config.map.resolution);
        this.dest_py = Math.floor(config.map.padding_y + config.map.height + 0.5 * config.map.resolution);

        this.current_gx = this.start_gx;
        this.current_gy = this.start_gy;

        var pixel = grid_to_pixel(this.current_gx, this.current_gy);
        this.current_px = pixel.x;
        this.current_py = pixel.y;

        // pixel/time step
        this.speed = 0.5
        this.displacement = 0.0
        this.path = []

        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("rgba(0, 255, 255, 0.8").drawCircle(0, 0, config.map.resolution * 0.5 - 1);
        this.shape.x = pixel.x;
        this.shape.y = pixel.y;

        this.compute_path()
    }

    move() {
        this.displacement += this.speed;

        if (this.displacement < 1.0) {
            return;
        }

        for (var i = 0; i < this.displacement; ++i) {
            this.path.pop();
        }
        this.displacement = 0.0;

        var current_dest = this.path.pop();
        if (current_dest == undefined) {
            return;
        }
        this.shape.x = current_dest.x;
        this.shape.y = current_dest.y;
    }

    compute_path() {
    }
}