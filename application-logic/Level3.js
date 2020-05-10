Game.Level3 = function(game){


};
Game.Level3.prototype = {


    preload: function(){


        this.load.image('background3', 'assets/games/starstruck/Map3.png');

        this.load.spritesheet('swords', 'assets/games/starstruck/katanaSprite3.png', 70, 20);

        this.load.tilemap('level3', 'assets/games/starstruck/L3.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('ground3', 'assets/games/starstruck/Ground3.png');    

        this.load.image('tiled3', 'assets/games/starstruck/tiled3.png');  

    },
      
    create: function() {

        // <Внешний мир>

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background3');
        bg.scale.setTo(0.5,0.5);
        bg.fixedToCamera = true;

        map = this.add.tilemap('level3');

        map.addTilesetImage('tiled3');

        map.addTilesetImage('ground3');

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

        new CheckPointer(1, this, 2186, 230);
        new Ends(this, 2460, 1180, Level4);

        xCoordinateComeback = 200;
        yCoordinateComeback = 500;

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

    new EnemyNinja(0, this, 1952, 270, 200,3000);
    new EnemyNinja(1, this, 2100, 525, 200,3000);
    //new EnemyNinja(2, this, 2464, 768, 100, 2000);
    //new EnemyNinja(3, this, 1568, 200, 300, 3000);
    //new EnemyNinja(4, this, 1600, 440, 300, 3000);
    //new EnemyNinja(5, this, 2150, 440, 500,5000);
    //new EnemyNinja(6, this, 2190, 280, 370,5000);
    //new EnemyNinja(7, this, 2570, 182, 100, 1000);
    //new EnemyNinja(8, this, 2270, 135, 170,2000);
    
    },
    createTrees: function () {

    new EnemyTree(0, this, 2150, 950);
    //new EnemyTree(1, this, 900, 350);
    //new EnemyTree(2, this, 1950, 350);
    
    },

    createBats: function () {

    new EnemyBat(0, this, 1152, 320);
    new EnemyBat(1, this, 1654, 224);
   // new EnemyBat(2, this, 2560, 48);
    
    },

    createTotems: function () {

    new EnemyTotem(0, this, 2106, 260);
    new EnemyTotem(1, this, 2150, 510);
    new EnemyTotem(2, this, 2464, 780);
    
    },

    createLezo: function () {

    new Lezo(0, this, 670, 740);
    new Lezo(0, this, 710, 740);

    new Lezo(1, this, 950, 740);
    new Lezo(1, this, 980, 740);
    new Lezo(1, this, 1020, 740);
    new Lezo(1, this, 1060, 740);

    new Lezo(2, this, 1100, 820);
    new Lezo(2, this, 1140, 820);
    new Lezo(2, this, 1180, 820);
    new Lezo(2, this, 1220, 820);

    new Lezo(3, this, 1500, 544);
    new Lezo(3, this, 1540, 544);
    new Lezo(3, this, 1580, 504);
    new Lezo(3, this, 1620, 484);
    new Lezo(3, this, 1660, 484);
    new Lezo(3, this, 1700, 464);
    new Lezo(3, this, 1740, 444);
    new Lezo(3, this, 1780, 424);
    new Lezo(3, this, 1820, 404);
    new Lezo(3, this, 1860, 384);
    new Lezo(3, this, 1900, 364);
    new Lezo(3, this, 1940, 344);
    //new Lezo(1, this, 1580, 448);
    //new Lezo(2, this, 2000, 96);
    //new Lezo(2, this, 2000, 128);
    //new Lezo(3, game, 1710, 310);
    //new Lezo(3, game, 1740, 320); 
    },

    createJumper: function () {

    new Jumper(0, this, 1100, 604);
    new Jumper(1, this, 1600, 368);
    new Jumper(2, this, 1824, 305);
    
    }
};
function Level4(){
        this.state.start('Level4');
    };

