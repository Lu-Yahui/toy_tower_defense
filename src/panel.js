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

        this.origin = {
            x: start_x,
            y: start_y
        };

        this.initialize_round_info();
        this.initialize_monster_info();
        this.initialize_player_info();

    }

    initialize_round_info() {
        this.round_info = new createjs.Text("Round: 0", "20px Arial", "#000");
        this.round_info.x = this.origin.x + 20;
        this.round_info.y = this.origin.y;
        this.stage.addChild(this.round_info);
    }

    initialize_monster_info() {
        var text_upper = "Footman: 0  Swordsman: 0";
        this.monster_info_upper = new createjs.Text(text_upper, "20px Arial", "#000");
        this.monster_info_upper.x = this.origin.x + 20;
        this.monster_info_upper.y = this.origin.y + 40;

        var text_lower = "Knight: 0  Assassin: 0";
        this.monster_info_lower = new createjs.Text(text_lower, "20px Arial", "#000");
        this.monster_info_lower.x = this.origin.x + 20;
        this.monster_info_lower.y = this.origin.y + 65;

        this.stage.addChild(this.monster_info_upper);
        this.stage.addChild(this.monster_info_lower);
    }

    initialize_player_info() {
        var text = "Life: 100.0  Money: 100.0";
        this.player_info = new createjs.Text(text, "20px Arial", "#000");
        this.player_info.x = this.origin.x + 20;
        this.player_info.y = this.origin.y + 105;
        this.stage.addChild(this.player_info);
    }

    update_round_info(round) {
        this.round_info.text = `Round: ${round}`;
    }

    update_monster_info(num_footman, num_swordsman, num_knight, num_assassin) {
        var text_upper = `Footman: ${num_footman}  Swordsman: ${num_swordsman}`;
        var text_lower = `Knight: ${num_knight}  Assassin: ${num_assassin}`;
        this.monster_info_upper.text = text_upper;
        this.monster_info_lower.text = text_lower;
    }

    update_player_info(life, money) {
        var text = `Life: ${life}  Money: ${money}`;
        this.player_info.text = text;
    }
}