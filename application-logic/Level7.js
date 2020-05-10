Game.Level7 = function(game){

};

Game.Level7.prototype = {


    preload: function(){

        this.load.spritesheet('gun','assets/games/starstruck/Gun2.png', 50, 27);

        this.load.tilemap('level7', 'assets/games/starstruck/L7test.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('background7', 'assets/games/starstruck/Map7.png');
        
        this.load.image('ground7', 'assets/games/starstruck/Ground7.png');    

        this.load.image('tiled7', 'assets/games/starstruck/tiled7.png'); 

    },
      
    create: function() {

        // <Внешний мир>

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background7');
        bg.scale.setTo(0.5,0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level7');

        map.addTilesetImage('tiled7');

        map.addTilesetImage('ground7');

        map.setCollisionByExclusion([0], true, layer);
        map.setCollisionByExclusion([1], false, layer);

        layer = map.createLayer('Tile Layer 1');

        layer2 = map.createLayer('Tile Layer 2');

        layer.resizeWorld();

        this.physics.arcade.gravity.y = 250;
        //<Emmiter>
        emitter = this.add.emitter(0, 0, 200);

        emitter.makeParticles('chunk');
        emitter.minParticleScale =0.1;
        emitter.maxParticleScale =1.5;
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.gravity = 150;
        emitter.bounce.setTo(0.5, 0.5);

        //</Emmiter>
        //<Emmiter>
        emitterDeath1 = this.add.emitter(0, 0, 400);

        emitterDeath1.makeParticles('chunkDeath1');
        emitterDeath1.minParticleScale =0.09;
        emitterDeath1.maxParticleScale =2;
        emitterDeath1.minRotation = 0;
        emitterDeath1.maxRotation = 360;

        emitterDeath2 = this.add.emitter(0, 0, 200);

        emitterDeath2.makeParticles('chunkDeath2');
        emitterDeath2.minParticleScale =0.09;
        emitterDeath2.maxParticleScale =2;
        emitterDeath2.minRotation = 0;
        emitterDeath2.maxRotation = 360;
      
        //</Emmiter>

        // </Внешний мир>

        var gun1 = new Gun(this, xCoordinateComeback, yCoordinateComeback);

        checkPointers = this.add.group();

        new Ends(this, 2463, 816, Level1);

        xCoordinateComeback = 1666;
        yCoordinateComeback = 830;

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


        golds = this.add.group();;

        //  The score
        scoreString = 'Score : ';
        scoreText = this.add.text(10, 10, scoreString + player.points, { font: '44px Arial', fill: "#9802d4" });
        scoreText.fixedToCamera = true;
        scoreText.fontWeight = 'bold';

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        activateButton = this.input.keyboard.addKey(Phaser.KeyCode.E);
    },

    update: function() {

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

        scoreText.setText(scoreString+player.points);

    },

    

    checkPointerActivate: function(player, checkPointer){

        xCoordinateComeback = checkPointer.xBorn;
        yCoordinateComeback = checkPointer.yBorn;
        checkPointer.activateState = true;

    },

    particleBurst: function() {

        emitter.x = player.x;
        emitter.y = player.y;
        emitter.start(true, 1000, null, 1);

    },
    particleDeath: function(enemy) {

        emitterDeath2.x = enemy.x;
        emitterDeath2.y = enemy.y;
        emitterDeath1.x = enemy.x;
        emitterDeath1.y = enemy.y;
        emitterDeath2.start(true, 2000, null, 5);
        emitterDeath1.start(true, 2000, null, 5);

        new Gold(this,enemy.x,enemy.y);
        enemy.kill();
    },

    flash: function () {
        this.camera.flash(0xff0000, 500);
    },

    resetPlayer: function(player,  ninjis){
        this.flash();
        player.points = 0;
        gun.reset(xCoordinateComeback, yCoordinateComeback);
        player.reset(xCoordinateComeback, yCoordinateComeback);
        reviveGun();
        reviveNinjis(this);
        reviveTrees(this);
        reviveBats(this);
        reviveTotems(this);
        reviveLezo(this);
    },
    render: function () {

        },
    createNinjis: function () {

    new EnemyNinja(0, this, 1248, 815, 120, 1000);

    new EnemyNinja(1, this, 768, 784, 120, 1000);

    new EnemyNinja(2, this, 480, 832, 120, 1000);

    new EnemyNinja(3, this, 256, 448, 80, 1000);

    new EnemyNinja(4, this, 1344, 320, 210, 2000);

    new EnemyNinja(5, this, 2048, 48, 80, 1000);

    new EnemyNinja(6, this, 2368, 816, 150, 2000);
    
    },
    createTrees: function () {
 
    },

    createBats: function () {

    new EnemyBat(0, this, 50, 50);

    new EnemyBat(1, this, 2464, 50);
    
    },

    createTotems: function () {
    
    new EnemyTotem(1, this, 1536, 300);

    new EnemyTotem(2, this, 2496, 796);
    
    },

    createLezo: function () {

    new Lezo(0, this, 2368, 790);
    new Lezo(0, this, 2368, 820);
    new Lezo(1, this, 896, 800);

    new Lezo(2, this, 640, 832);
    new Lezo(2, this, 705, 816);


    new Lezo(3, this, 352, 448);
    new Lezo(3, this, 96, 560); 
    new Lezo(3, this, 352, 688);

    new Lezo(4, this, 544, 384); 
    new Lezo(4, this, 864, 240);

    new Lezo(5, this, 2432, 320);


    },

    createJumper: function () {
    
    }
};
