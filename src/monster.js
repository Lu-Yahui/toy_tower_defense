class Monster {
    constructor(start_gx, start_gy, dest_gx, dest_gy, grid_map) {
        this.id = IdGenerator.get_monster_id();
        this.start_gx = start_gx;
        this.start_gy = start_gy;

        this.dest_gx = dest_gx;
        this.dest_gy = dest_gy;

        this.grid_map = grid_map;
        this.arrived = false;
        this.dead = false;

        var dest_pixel = grid_to_pixel(this.grid_map.grid_cols - 1, this.grid_map.grid_rows - 1);
        this.dest_px = dest_pixel.x;
        this.dest_py = dest_pixel.y;

        this.current_gx = this.start_gx;
        this.current_gy = this.start_gy;

        var pixel = grid_to_pixel(this.current_gx, this.current_gy);
        this.current_px = pixel.x;
        this.current_py = pixel.y;

        // pixel/time step
        this.speed = 0.5
        this.displacement = 0.0
        this.life = 100
        this.path = []

        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("rgba(0, 255, 255, 0.8").drawCircle(0, 0, config.map.resolution * 0.5 - 1);
        this.shape.x = pixel.x;
        this.shape.y = pixel.y;

        this.path_planner = new AStarPathPlanner(0.5, 0.5, this.grid_map);
        this.compute_path(this.current_px, this.current_py, this.dest_px, this.dest_py);
    }

    move() {
        if (this.path.length === 0) {
            this.trigger_arrived_event();
            return;
        }

        this.update_status();

        this.displacement += this.speed;

        if (this.displacement < 1.0) {
            return;
        }

        for (var i = 0; i < this.displacement; ++i) {
            this.path.shift();
        }
        this.displacement = 0.0;

        var current_dest = this.path.shift();
        if (current_dest == undefined) {
            this.trigger_arrived_event();
            return;
        }
        this.shape.x = current_dest.x;
        this.shape.y = current_dest.y;

        this.current_px = current_dest.x;
        this.current_py = current_dest.y;
    }

    compute_path(start_px, start_py, end_px, end_py) {
        this.path = this.path_planner.search_path(start_px, start_py, end_px, end_py);
    }

    set_speed(speed) {
        this.speed = speed;
    }

    trigger_arrived_event() {
        this.arrived = true;
        this.grid_map.stage.removeChild(this.shape);
    }

    update_status() {
        this.shape.scaleX = this.life / 100.0 + 0.05;
        this.shape.scaleY = this.life / 100.0 + 0.05;
    }
}