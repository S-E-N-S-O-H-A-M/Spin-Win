let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% Off", "Hard Luck", "70% Off", "Swagpack", "100% Off", "Netflix Subscription", "50% Off", "Amazon Voucher", " 2 Extra Spin", "CB Tshirt", "CB Book"],
}
let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: 0xffcc00,

    scene: {
        preload: preload,
        create: create,
        update: update,

    }
};

let game = new Phaser.Game(config);

function preload() {
    console.log("Preload");
    this.load.image('background', '../Assets/back.jpg');
    this.load.image('wheel', '../Assets/wheel.png');
    this.load.image('pin', '../Assets/pin.png');
    this.load.image('stand', '../Assets/stand.png');
    console.log(this);
}

function create() {
    console.log("Create");
    let W = game.config.width;
    let H = game.config.height;

    let background = this.add.sprite(0, 0, 'background');
    background.setPosition(W / 2, H / 2);
    background.setScale(0.20);

    this.wheel = this.add.sprite(0, 0, 'wheel');
    this.wheel.setPosition(W / 2, H / 2);
    this.wheel.setScale(0.25);
    this.wheel.depth = 1;

    let pin = this.add.sprite(0, 0, 'pin');
    pin.setPosition(W / 2, H / 2 - 250);
    pin.setScale(0.25);
    pin.depth = 1;

    let stand = this.add.sprite(0, 0, 'stand');
    stand.setPosition(W / 2, H / 2 + 250);
    stand.setScale(0.25);

    this.input.on("pointerdown", spinwheel, this);

    font_style = {
        font: "bold 30px Arial",
        align: "center",
        color: "red",
    }

    this.game_text = this.add.text(10, 10, "Welcome to Spin & Win", font_style);

}

function update() {
    console.log("Inside Update");
}

function spinwheel() {
    console.log("You clicked the mouse");
    console.log("Started spining");

    let rounds = Phaser.Math.Between(2, 4);
    let degrees = Phaser.Math.Between(0, 11) * 30;

    let total_angle = rounds * 360 + degrees;
    console.log(total_angle);

    let idx = prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function() {
            this.game_text.setText("You won something " + prizes_config.prize_names[idx]);
        },
    });
}