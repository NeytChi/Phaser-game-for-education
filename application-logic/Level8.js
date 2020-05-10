Game.Level8 = function(game){

};

Game.Level8.prototype = {


    preload: function(){

        this.load.spritesheet('gun','assets/games/starstruck/Gun2.png', 50, 27);

    },
      
    create: function() {

        // <Внешний мир>

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');
        bg.scale.setTo(0.5,0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level1');

        map.addTilesetImage('tiled');

        map.addTilesetImage('ground');

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

        new CheckPointer(1, this, 640, 310);
        new CheckPointer(2, this, 2070, 340);
        new Ends(this, 2650, 430, Level1);

        xCoordinateComeback = 400;
        yCoordinateComeback = 200;

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
        // this.debug.text(this.time.physicsElapsed, 32, 32);
        // this.debug.body(player);
        // this.debug.bodyInfo(player, 16, 24);

        },
    createNinjis: function () {

    new EnemyNinja(0, this, 864, 425, 270,3000);
    new EnemyNinja(1, this, 1325, 425, 150,2000);
    new EnemyNinja(2, this, 1312, 260, 100, 2000);
    new EnemyNinja(3, this, 1568, 200, 300, 3000);
    new EnemyNinja(4, this, 1600, 440, 300, 3000);
    new EnemyNinja(5, this, 2150, 440, 500,5000);
    new EnemyNinja(6, this, 2190, 280, 370,5000);
    new EnemyNinja(7, this, 2570, 182, 100, 1000);
    new EnemyNinja(8, this, 2270, 135, 170,2000);
    
    },
    createTrees: function () {

    new EnemyTree(0, this, 1050, 350);
    new EnemyTree(1, this, 900, 350);
    new EnemyTree(2, this, 1950, 350);
    
    },

    createBats: function () {

    new EnemyBat(0, this, 1280, 48);
    new EnemyBat(1, this, 2400, 48);
    new EnemyBat(2, this, 2560, 48);
    
    },

    createTotems: function () {

    new EnemyTotem(0, this, 1728, 190);
    new EnemyTotem(1, this, 1970, 110);
    new EnemyTotem(2, this, 2370, 266);
    
    },

    createLezo: function () {

    new Lezo(0, this, 1130, 432);
    new Lezo(1, this, 1580, 448);
    new Lezo(2, this, 2000, 96);
    new Lezo(2, this, 2000, 128);
    //new Lezo(3, game, 1710, 310);
    //new Lezo(3, game, 1740, 320); 
    },

    createJumper: function () {

    new Jumper(0, this, 300, 480);
    new Jumper(1, this, 1900, 460);
    new Jumper(2, this, 2140, 460);
    
    }
};


function Level1(){
        this.state.start('Level1');
    };