class Barrier {
    constructor(gx, gy) {
        this.gx = gx;
        this.gy = gy;
        var pixel = grid_to_pixel(this.gx, this.gy);
        this.px = pixel.x;
        this.py = pixel.y;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("rgba(0, 0, 0, 0.9)").drawCircle(0, 0, config.map.resolution * 0.5 - 1);
        this.shape.x = this.px;
        this.shape.y = this.py;
    }
}