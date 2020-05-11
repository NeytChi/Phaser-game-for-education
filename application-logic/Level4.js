Game.Level4 = function(game){


};
Game.Level4.prototype = {


    preload: function () {

        this.load.image('background3', 'assets/games/starstruck/Map3.png');


        this.load.spritesheet('swords', 'assets/games/starstruck/katanaSprite3.png', 70, 20);

        this.load.tilemap('level4', 'assets/games/starstruck/L4.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('ground3', 'assets/games/starstruck/Ground3.png');

        this.load.image('tiled3', 'assets/games/starstruck/tiled3.png');


    },

    create: function () {


        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background3');
        bg.scale.setTo(0.5, 0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level4');

        map.addTilesetImage('tiled3');

        map.addTilesetImage('ground3');

        map.setCollisionByExclusion([0], true, layer);
        map.setCollisionByExclusion([1], false, layer);

        layer = map.createLayer('Tile Layer 1');

        layer2 = map.createLayer('Tile Layer 2');

        layer.resizeWorld();

        this.physics.arcade.gravity.y = 250;
        emitter = this.add.emitter(0, 0, 200);

        emitter.makeParticles('chunk');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 1.5;
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.gravity = 150;
        emitter.bounce.setTo(0.5, 0.5);

        emitterDeath1 = this.add.emitter(0, 0, 400);

        emitterDeath1.makeParticles('chunkDeath1');
        emitterDeath1.minParticleScale = 0.09;
        emitterDeath1.maxParticleScale = 2;
        emitterDeath1.minRotation = 0;
        emitterDeath1.maxRotation = 360;

        emitterDeath2 = this.add.emitter(0, 0, 200);

        emitterDeath2.makeParticles('chunkDeath2');
        emitterDeath2.minParticleScale = 0.09;
        emitterDeath2.maxParticleScale = 2;
        emitterDeath2.minRotation = 0;
        emitterDeath2.maxRotation = 360;

        var sword1 = new Sword(this, xCoordinateComeback, yCoordinateComeback);

        checkPointers = this.add.group();

        new Ends(this, 1530, 106, Level5);

        xCoordinateComeback = 375; //254
        yCoordinateComeback = 688; //102

        player1 = new Player(this, xCoordinateComeback, yCoordinateComeback);


        cursors = this.input.keyboard.createCursorKeys();

        ninjis = this.add.group();
        this.createNinjis(this);
        trees = this.add.group();
        this.createTrees(this);
        manybats = this.add.group();
        this.createBats(this);
        totems = this.add.group();
        this.createTotems(this);

        lezos = this.add.group();
        this.createLezo(this);

        jumpers = this.add.group();
        this.createJumper(this);

        golds = this.add.group();

        //  The score
        scoreString = 'Score : ';
        scoreText = this.add.text(10, 10, scoreString + player.points, {font: '44px Arial', fill: "#9802d4"});
        scoreText.fixedToCamera = true;
        scoreText.fontWeight = 'bold';

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        activateButton = this.input.keyboard.addKey(Phaser.KeyCode.E);
    },

    update: function () {

        this.physics.arcade.collide(player, layer);

        this.physics.arcade.collide(emitter, layer);

        this.physics.arcade.collide(trees, layer);

        this.physics.arcade.collide(golds, layer);

        emitter.x = sword.x;
        emitter.y = sword.y;
        emitter.start(true, 200, null, 1);


        //<Оружие>
        if (attackState == true) {

            this.physics.arcade.overlap(sword, ninjis, collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, trees, collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, manybats, collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, totems, collisionHandlerSword, null, this);

            attackState = false;

        }

        //<Оружие>

        // Коллизии

        this.physics.arcade.overlap(trees, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(ninjis, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(manybats, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(player, checkPointers, this.checkPointerActivate, null, this);

        this.physics.arcade.overlap(lezos, player, this.resetPlayer, null, this);

        //\Коллизии 

        scoreText.setText(scoreString + player.points);
    },

    render: function () {

        this.debug.inputInfo(32, 32);

    },
    checkPointerActivate: function (player, checkPointer) {

        xCoordinateComeback = checkPointer.xBorn;
        yCoordinateComeback = checkPointer.yBorn;
        checkPointer.activateState = true;

    },

    particleBurst: function () {

        emitter.x = sword.x;
        emitter.y = sword.y;
        emitter.start(true, 1000, null, 1);

    },
    particleDeath: function (enemy) {

        emitterDeath2.x = enemy.x;
        emitterDeath2.y = enemy.y;
        emitterDeath1.x = enemy.x;
        emitterDeath1.y = enemy.y;
        emitterDeath2.start(true, 2000, null, 5);
        emitterDeath1.start(true, 2000, null, 5);

        new Gold(this, enemy.x, enemy.y);
        enemy.kill();
    },

    flash: function () {
        this.camera.flash(0xff0000, 500);
    },

    resetPlayer: function (player, ninjis) {
        this.flash();
        player.points = 0;
        sword.reset(xCoordinateComeback, yCoordinateComeback);
        player.reset(xCoordinateComeback, yCoordinateComeback);
        reviveSword();
        reviveNinjas(this);
        reviveTrees(this);
        reviveBats(this);
        reviveTotems(this);
        reviveLezo(this);
    },
    render: function () {
        // this.debug.text(this.time.physicsElapsed, 32, 32);
        // this.debug.body(player);
        // this.debug.bodyInfo(player, 16, 24);

    },
    createNinjis: function () {
        new EnemyNinja(0, this, 992, 107, 120, 2000);
    },
    createTrees: function () {
    },

    createBats: function () {
    },

    createTotems: function () {
        new EnemyTotem(1, this, 96, 556);
        new EnemyTotem(0, this, 1310, 76);
    },

    createLezo: function () {

        new Lezo(0, this, 225, 586);
        new Lezo(0, this, 225, 556);
        new Lezo(0, this, 225, 526);
        new Lezo(0, this, 225, 496);

        new Lezo(1, this, 325, 768);
        new Lezo(1, this, 285, 768);
        new Lezo(1, this, 245, 768);


        new Lezo(2, this, 50, 290);
        new Lezo(2, this, 50, 250);
        new Lezo(2, this, 175, 360);
        new Lezo(2, this, 185, 140);
        new Lezo(2, this, 50, 140);

        new Lezo(3, this, 750, 260);
        new Lezo(3, this, 620, 230);
        new Lezo(3, this, 610, 480);
        new Lezo(3, this, 670, 660);

        new Lezo(4, this, 576, 768);
        new Lezo(4, this, 616, 768);
        new Lezo(4, this, 656, 768);
        new Lezo(4, this, 696, 768);
        new Lezo(4, this, 736, 768);

        new Lezo(5, this, 864, 768);
        new Lezo(5, this, 904, 768);
        new Lezo(5, this, 944, 768);

        new Lezo(6, this, 1150, 176);
        new Lezo(6, this, 1250, 176);
        new Lezo(6, this, 1350, 176);
        new Lezo(6, this, 1450, 176);

    },

    createJumper: function () {

        new Jumper(0, this, 325, 580);
        new Jumper(1, this, 60, 430);
        new Jumper(1, this, 165, 230);
        new Jumper(2, this, 950, 640);
        new Jumper(2, this, 890, 440);
        new Jumper(2, this, 930, 240);

    }
};
function Level5() {
    this.state.start('Level5');
}