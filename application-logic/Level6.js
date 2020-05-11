Game.Level6 = function(game){

};

Game.Level6.prototype = {


    preload: function () {

        this.load.spritesheet('gun', 'assets/games/starstruck/Gun2.png', 50, 27);

        this.load.image('background5', 'assets/games/starstruck/Map5.png');

        this.load.tilemap('level6', 'assets/games/starstruck/L6.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('ground5', 'assets/games/starstruck/Ground5.png');

        this.load.image('tiled5', 'assets/games/starstruck/tiled5.png');

    },

    create: function () {

        // <Внешний мир>

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background5');
        bg.scale.setTo(0.5, 0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level6');

        map.addTilesetImage('tiled5');

        map.addTilesetImage('ground5');

        map.setCollisionByExclusion([0], true, layer);
        map.setCollisionByExclusion([1], false, layer);

        layer = map.createLayer('Tile Layer 1');

        layer2 = map.createLayer('Tile Layer 2');

        layer.resizeWorld();

        this.physics.arcade.gravity.y = 250;
        //<Emmiter>
        emitter = this.add.emitter(0, 0, 200);

        emitter.makeParticles('chunk');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 1.5;
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.gravity = 150;
        emitter.bounce.setTo(0.5, 0.5);

        //</Emmiter>
        //<Emmiter>
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

        //</Emmiter>

        // </Внешний мир>

        var gun1 = new Gun(this, xCoordinateComeback, yCoordinateComeback);

        checkPointers = this.add.group();

        new CheckPointer(1, this, 864, 668);
        new Ends(this, 1696, 628, Level7);

        xCoordinateComeback = 200;//700
        yCoordinateComeback = 100;//700

        player1 = new Player1(this, xCoordinateComeback, yCoordinateComeback);


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

        emitter.x = player.x;
        emitter.y = player.y;
        emitter.start(true, 200, null, 1);


        // Коллизии

        //this.physics.arcade.overlap(gun.bullet, layer, collisionBullet, null, this);

        this.physics.arcade.overlap(trees, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(ninjis, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(manybats, player, this.resetPlayer, null, this);

        this.physics.arcade.overlap(player, checkPointers, this.checkPointerActivate, null, this);

        this.physics.arcade.overlap(lezos, player, this.resetPlayer, null, this);

        //\Коллизии 

        scoreText.setText(scoreString + player.points);

    },


    checkPointerActivate: function (player, checkPointer) {

        xCoordinateComeback = checkPointer.xBorn;
        yCoordinateComeback = checkPointer.yBorn;
        checkPointer.activateState = true;

    },

    particleBurst: function () {

        emitter.x = player.x;
        emitter.y = player.y;
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
        gun.reset(xCoordinateComeback, yCoordinateComeback);
        player.reset(xCoordinateComeback, yCoordinateComeback);
        reviveGun();
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

        new EnemyNinja(0, this, 384, 173, 150, 2000);
        new EnemyNinja(0, this, 352, 478, 250, 2500);
        new EnemyNinja(0, this, 128, 478, 450, 4000);

        new EnemyNinja(1, this, 32, 640, 200, 2000);
        new EnemyNinja(1, this, 352, 780, 253, 2500);
        new EnemyNinja(1, this, 288, 912, 450, 4000);
        new EnemyNinja(1, this, 288, 912, 650, 4000);

        new EnemyNinja(2, this, 928, 590, 170, 2000);
        new EnemyNinja(2, this, 928, 590, 250, 2000);
        new EnemyNinja(2, this, 704, 510, 150, 1000);
        new EnemyNinja(2, this, 736, 430, 90, 1000);
        new EnemyNinja(2, this, 912, 302, 170, 2000);
        new EnemyNinja(2, this, 912, 302, 270, 2000);

    },
    createTrees: function () {

        new EnemyTree(0, this, 708, 700);

        new EnemyTree(1, this, 1600, 480);

    },

    createBats: function () {

    },

    createTotems: function () {

    },

    createLezo: function () {

    },

    createJumper: function () {

    }
};

function Level7() {
    this.state.start('Level7');
}