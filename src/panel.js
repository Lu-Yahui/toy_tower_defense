class Panel {
    constructor(stage) {
        this.stage = stage;
        var vertical_line = new createjs.Shape();
        this.stage.addChild(vertical_line);
        vertical_line.graphics.setStrokeStyle(1).beginStroke("rgba(127, 127, 127, 0.5)")

        var start_x = config.map.padding_x + config.map.width + 25;
        var start_y = config.map.padding_y;
        vertical_line.graphics.moveTo(start_x, start_y);

        var end_x = start_x;
        var end_y = config.map.padding_y + config.map.height;
        vertical_line.graphics.lineTo(end_x, end_y);
        vertical_line.graphics.endStroke();
    }
}