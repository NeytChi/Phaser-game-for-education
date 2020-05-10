Game.Level2 = function(game){


};
Game.Level2.prototype = {


    preload: function(){

        this.load.spritesheet('swords', 'assets/games/starstruck/katanaSprite3.png', 70, 20);

        this.load.tilemap('level2', 'assets/games/starstruck/L2.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('background', 'assets/images/Map2.png');

        this.load.image('ground', 'assets/games/starstruck/Ground.png');    

        this.load.image('tiled', 'assets/games/starstruck/tiled.png');  

    },
      
    create: function() {

        // <Внешний мир>

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');
        bg.scale.setTo(0.5,0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level2');

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

        var sword1 = new Sword(this, xCoordinateComeback, yCoordinateComeback);

        checkPointers = this.add.group();

        new CheckPointer(1, this, 1360, 210);
        new CheckPointer(2, this, 400, 720);
        new Ends(this, 64, 928, Level3);

        xCoordinateComeback = 100;
        yCoordinateComeback = 256;

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

        //jumpers = this.add.group();
        //this.createJumper(this);

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

        emitter.x = sword.x;
        emitter.y = sword.y;
        emitter.start(true, 200, null, 1);


        //<Оружие>
        if (attackState == true){

            this.physics.arcade.overlap(sword, ninjis, collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, trees,  collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, manybats,  collisionHandlerSword, null, this);

            this.physics.arcade.overlap(sword, totems,  collisionHandlerSword, null, this);

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

        scoreText.setText(scoreString+player.points);
    },

    render: function(){

        this.debug.inputInfo(32, 32);

    },
    checkPointerActivate: function(player, checkPointer){

        xCoordinateComeback = checkPointer.xBorn;
        yCoordinateComeback = checkPointer.yBorn;
        checkPointer.activateState = true;

    },

    particleBurst: function() {

        emitter.x = sword.x;
        emitter.y = sword.y;
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
        sword.reset(xCoordinateComeback, yCoordinateComeback);
        player.reset(xCoordinateComeback, yCoordinateComeback);
        reviveSword();
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

    new EnemyNinja(0, this, 50, 425, 320, 4000);
    new EnemyNinja(1, this, 425, 490, 70, 1000);
    new EnemyNinja(2, this, 934, 60, 210, 4000);
    new EnemyNinja(3, this, 1070, 814, 140, 2000);
    },
    createTrees: function () {

    new EnemyTree(0, this, 608, 464);
    new EnemyTree(1, this, 1200, 370); 
    },

    createBats: function () {
   
    },

    createTotems: function () {

    new EnemyTotem(0, this, 370, 320);
    new EnemyTotem(1, this, 870, 336);
    new EnemyTotem(2, this, 1525, 150);
    new EnemyTotem(3, this, 1160, 800);
    new EnemyTotem(4, this, 800, 752);
    new EnemyTotem(4, this, 800, 928);
    new EnemyTotem(4, this, 544, 752);

    },

    createLezo: function () {

    new Lezo(0, this, 1200, 472);
    new Lezo(1, this, 1515, 970);
    new Lezo(1, this, 1545, 970);
    new Lezo(2, this, 1300, 1080);
    new Lezo(2, this, 1320, 1080);
    new Lezo(3, this, 672, 953);
    new Lezo(3, this, 776, 953); 
    },

    createJumper: function () {

    new Jumper(0, this, 300, 480);
    new Jumper(1, this, 1900, 460);
    new Jumper(2, this, 2140, 460);
    
    }
};
function Level3(){
        this.state.start('Level3');
    };