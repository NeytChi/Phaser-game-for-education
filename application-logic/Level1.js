Game.Level1 = function(game) {
    
};

let player1;
let player;
let fireButton;
let activateButton;
let attackState = false;
const swordCourse = true;
let emitter;
let facing = 'left';
let RLPlayer;
let jumpTimer = 0;
let jumpButton;
let sword;
let damage;
let scenarioText;

let map;
let tileset;
let layer;
let cursors;
let bg;
const angleSword = 0;

const stopEmitterDeath = false;
const aliveEnemy = true;
const hp = 100;

let tweenLength;
let tweenTime;
let xBorn;
let yBorn;
let RLways;


const hitted = false;
let ninjis;
let trees;
let manybats;
let totems;
let lezos;
let jumpers;
let golds;


let checkPointers;
const activateState = false;
let xCoordinateComeback = 0;
let yCoordinateComeback = 0;

let scoreString;
let scoreText;


Game.Level1.prototype = {


    preload: function () {

        this.load.spritesheet('swords', 'assets/games/starstruck/katanaSprite3.png', 70, 20);

        this.load.tilemap('level1', 'assets/games/starstruck/L1.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('background', 'assets/images/Map2.png');

        this.load.image('ground', 'assets/games/starstruck/Ground.png');

        this.load.image('tiled', 'assets/games/starstruck/tiled.png');

        this.load.spritesheet('s0', 'assets/games/starstruck/s0.png', 29, 34);

    },

    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#000000';

        bg = this.add.tileSprite(0, 0, 1600, 1200, 'background');
        bg.scale.setTo(0.5, 0.5);
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

        const sword1 = new Sword(this, xCoordinateComeback, yCoordinateComeback);

        checkPointers = this.add.group();

        new CheckPointer(1, this, 640, 310);
        new CheckPointer(2, this, 2070, 340);
        new Ends(this, 2650, 430, Level2);

        xCoordinateComeback = 400;
        yCoordinateComeback = 200;

        player1 = new Player(this, xCoordinateComeback, yCoordinateComeback);

        new Plot(this, 200, 410, 's0');

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

        emitter.x = sword.x;
        emitter.y = sword.y;
        emitter.start(true, 200, null, 1);


        //<Оружие>
        if (attackState === true) {

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

        new EnemyNinja(0, this, 864, 425, 270, 3000);
        new EnemyNinja(1, this, 1325, 425, 150, 2000);
        new EnemyNinja(2, this, 1312, 260, 100, 2000);
        new EnemyNinja(3, this, 1568, 200, 300, 3000);
        new EnemyNinja(4, this, 1600, 440, 300, 3000);
        new EnemyNinja(5, this, 2150, 440, 500, 5000);
        new EnemyNinja(6, this, 2190, 280, 370, 5000);
        new EnemyNinja(7, this, 2570, 182, 100, 1000);
        new EnemyNinja(8, this, 2270, 135, 170, 2000);

    },
    createTrees: function () {

        new EnemyTree(0, this, 1050, 350);
        new EnemyTree(2, this, 1950, 350);

    },

    createBats: function () {

        new EnemyBat(0, this, 1280, 48);
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
    },

    createJumper: function () {

    }
};
Player = function(game,x,y) {
    player = game.add.sprite(x, y, 'dude');
    player.RLPlayer = true;
    player.points = 0;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 15, true);
    player.animations.add('turn', [1], 20, true);
    player.animations.add('right', [4, 5, 6, 7], 15, true);
    player.animations.add('idleLeft', [8, 9, 10], 7, true);
    player.animations.add('idleRight', [12, 13, 14], 7, true);

    player.anchor.setTo(0.5, 0.5);
    game.camera.follow(player);

    player.update = function () {

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            game.particleBurst();
            RLPlayer = true;
            if (facing !== 'left') {
                player.animations.play('left');
                facing = 'left';

            }

        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            game.particleBurst();
            RLPlayer = false;
            if (facing !== 'right') {
                player.animations.play('right');
                facing = 'right';
            }

        } else {
            if (facing !== 'idle') {
                player.animations.stop();
                if (facing === 'left') {
                    player.animations.play('idleLeft');
                } else {
                    player.animations.play('idleRight');
                }
                facing = 'idle';
            }
        }
        if (fireButton.isDown) {
            attackState = true;
            console.log('attackState');
        }

        if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 200;
        }
    }
    player.bigJump = function () {

        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 200;

    }
};
Sword = function (game,x,y) {

    sword = game.add.sprite(x, y, 'swords');
    damage = 5;

    game.physics.enable(sword, Phaser.Physics.ARCADE);
    sword.enableBody = true;
    sword.body.collideWorldBounds = true;
    sword.body.allowGravity = false;
    sword.animations.add('left', [3, 5, 7], 10, true);
    sword.animations.add('right', [2, 4, 6], 10, true);
    sword.body.velocity.x = 0;
    sword.body.velocity.y = 0;
    game.camera.SHAKE_HORIZONTAL = true;

    sword.update = function () {

        game.physics.arcade.moveToXY(sword, player.x, player.y, 100, 100);

        if (attackState === true) {
            game.camera.shake(0.0005, 30);
            if (RLPlayer === true) {
                sword.anchor.setTo(0.9, 0.5);
                sword.animations.play('right');

            } else {
                sword.anchor.setTo(0.1, 0.5);
                sword.animations.play('left');
            }
        } else {
            if (RLPlayer === true) {
                sword.anchor.setTo(0.2, 0.5);
                sword.frame = 1;
            } else {
                sword.anchor.setTo(0.8, 0.5);
                sword.frame = 0;
            }
            sword.animations.stop();
        }

    }
};
CheckPointer = function (index,game,x,y) {

    const checkPointer = checkPointers.create(x, y, 'checkPointer');
    checkPointer.xBorn = x;
    checkPointer.yBorn = y;
    checkPointer.activateState = activateState;
    checkPointer.enableBody = true;
    checkPointer.anchor.setTo(0.5, 0.5);
    checkPointer.animations.add('no-activate', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    const activate = checkPointer.animations.add('activate', [8, 9, 10, 11, 12, 13], 15, false);
    checkPointer.name = index.toString();
    game.physics.enable(checkPointer, Phaser.Physics.ARCADE);
    checkPointer.body.bounce.y = 0.2;
    checkPointer.body.immovable = true;
    checkPointer.body.collideWorldBounds = true;
    checkPointer.body.allowGravity = false;
    checkPointer.animations.play('no-activate');

    checkPointer.update = function () {

        if (checkPointer.activateState === true) {
            if (activate.isFinished) {
                checkPointer.frame = 13;
            } else {
                checkPointer.animations.play('activate');
            }
        }
    }
};
Ends = function (game,x,y,callback) {

    const end = game.add.sprite(x, y, 'end');
    end.xBorn = x;
    end.yBorn = y;
    end.enableBody = true;
    end.anchor.setTo(0.5, 0.5);
    game.physics.enable(end, Phaser.Physics.ARCADE);
    end.body.bounce.y = 0.2;
    end.body.immovable = true;
    end.body.collideWorldBounds = true;
    end.body.allowGravity = false;

    end.update = function () {

        if (activateButton.isDown) {
            game.physics.arcade.overlap(end, player, callback, null, game);
        }

    }
};
Gold = function (game,x,y) {

    const gold = game.add.sprite(x, y, 'gold');
    golds.add(gold);
    gold.xBorn = x;
    gold.yBorn = y;
    gold.enableBody = true;
    gold.anchor.setTo(0.5,0.5);
    gold.scale.setTo(0.75,0.75);
    game.physics.enable(gold, Phaser.Physics.ARCADE);
    gold.body.bounce.y = 0.2;
    gold.body.immovable = true;
    gold.body.collideWorldBounds = true;
    gold.animations.add('golden', [ 0, 1, 2], 6, true);
    gold.animations.play('golden');

    gold.update = function(){

        game.physics.arcade.overlap(gold, player, gold.upper, null, game);

    }
    gold.upper = function(){
        player.points += Math.round(Math.random() * (30 - 1) + 1);
        console.log(player.points);
        gold.kill();
    }
};
Lezo = function (index,game,x,y){

    const lezo = lezos.create(x, y, 'lezo');
    lezo.xBorn = x;
        lezo.yBorn = y;
        lezo.activateState = activateState;
        lezo.enableBody = true;
        lezo.anchor.setTo(0.5,0.5);
        lezo.name = index.toString();
        game.physics.enable(lezo, Phaser.Physics.ARCADE);
        lezo.body.allowGravity = false;
        lezo.animations.play('no-activate');

        lezo.update = function(){

            lezo.angle+=2;    

        }
    };
Jumper = function (index,game,x,y){

    const jumper = jumpers.create(x, y, 'jumper');
    jumper.xBorn = x;
        jumper.yBorn = y;
        jumper.activateState = activateState;
        jumper.enableBody = true;
        jumper.anchor.setTo(0.5,0.5);
        jumper.name = index.toString();
        game.physics.enable(jumper, Phaser.Physics.ARCADE);
        jumper.body.allowGravity = false;
        jumper.animations.play('no-activate');
        tweenJumper = game.add.tween(jumper);

        jumper.update = function(){

            game.physics.arcade.overlap(jumper, player, player.bigJump, null, game);

            game.physics.arcade.overlap(jumper, player, jumper.sizer , null, game);

        },

        jumper.sizer = function(){


        }
    };
EnemyTotem = function (index,game,x,y){

    const totem = totems.create(x, y, 'enemyTotem');
    totem.stateON = false;
    totem.hitted = hitted;
    totem.hp = 200;
    totem.aliveEnemy = aliveEnemy;
    totem.RLways = true;
    totem.xBorn = x;
    totem.yBorn = y;
    totem.enableBody = true;
    totem.anchor.setTo(0.5,0.5);
    //totem.animations.add('totemLeft', [0], 0.5, false);
    totem.animations.add('totemRight', [0, 1], 0.3, true);
    totem.name = index.toString();
    game.physics.enable(totem, Phaser.Physics.ARCADE);
    totem.body.immovable = true;
    totem.body.collideWorldBounds = true;
    totem.body.bounce.y = 0.2;
    totem.body.allowGravity = false;


    //<Выстрел>            
    const weapon1 = game.add.weapon(30, 'bullet');//  Creates 30 bullets, using the 'chunk1' graphic
    weapon1.bulletKillType = Phaser.Weapon.KILL_DISTANCE ;//  The bullet will be automatically killed when it leaves the world bounds
    weapon1.bulletSpeed = 500;//  The speed at which the bullet is fired
    weapon1.fireRate = 4000; //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon1.fireAngle = 180;// Because our bullet is drawn facing up, we need to offset its rotation: 
    weapon1.bulletKillDistance =300;
    //</Выстрел> //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon1.trackSprite(totem, -18, -10, false);

    const weapon2 = game.add.weapon(30, 'bullet');//  Creates 30 bullets, using the 'chunk1' graphic
    weapon2.bulletKillType = Phaser.Weapon.KILL_DISTANCE ;//  The bullet will be automatically killed when it leaves the world bounds
    weapon2.bulletSpeed = 500;//  The speed at which the bullet is fired
    weapon2.fireRate = 4000; //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon2.fireAngle = 315;// Because our bullet is drawn facing up, we need to offset its rotation: 
    weapon2.bulletKillDistance =300;
    //</Выстрел> //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon2.trackSprite(totem, -18, -10, false);

    const weapon3 = game.add.weapon(30, 'bullet');//  Creates 30 bullets, using the 'chunk1' graphic
    weapon3.bulletKillType = Phaser.Weapon.KILL_DISTANCE ;//  The bullet will be automatically killed when it leaves the world bounds
    weapon3.bulletSpeed = 500;//  The speed at which the bullet is fired
    weapon3.fireRate = 4000; //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon3.fireAngle = 359;// Because our bullet is drawn facing up, we need to offset its rotation: 
    weapon3.bulletKillDistance =300;
    //</Выстрел> //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon3.trackSprite(totem, -18, -10, false);

    const weapon4 = game.add.weapon(30, 'bullet');//  Creates 30 bullets, using the 'chunk1' graphic
    weapon4.bulletKillType = Phaser.Weapon.KILL_DISTANCE ;//  The bullet will be automatically killed when it leaves the world bounds
    weapon4.bulletSpeed = 500;//  The speed at which the bullet is fired
    weapon4.fireRate = 4000; //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon4.fireAngle = 230;// Because our bullet is drawn facing up, we need to offset its rotation: 
    weapon4.bulletKillDistance =300;
    //</Выстрел> //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon4.trackSprite(totem, -18, -10, false);
    


    totem.update = function(){


        if(totem.aliveEnemy){
            totem.animations.play('totemRight');
            totem.tint = 0xFFFFFF;
        }
        

        

        if( totem.frame === 0){
            totem.stateON=true;
            weapon1.fire();
            weapon2.fire();
            weapon3.fire();
            weapon4.fire();
        }
        if( totem.frame === 1){
            totem.stateON=false;
        }

        game.physics.arcade.overlap(weapon1.bullets, player, game.resetPlayer, null, game);

        game.physics.arcade.overlap(weapon2.bullets, player, game.resetPlayer, null, game);

        game.physics.arcade.overlap(weapon3.bullets, player, game.resetPlayer, null, game);

        game.physics.arcade.overlap(weapon4.bullets, player, game.resetPlayer, null, game);


        
        if (totem.aliveEnemy===false){
            totem.aliveEnemy=true;
            game.particleDeath(totem);
            totem.destroy();
            weapon1.killAll();
            weapon2.killAll();
            weapon3.killAll();
            weapon4.killAll();
        }
        if(totem.hp===0){
            totem.aliveEnemy=false;
        }
        if(totem.hitted===true && totem.stateON===true){
            totem.hp = totem.hp-damage;
            totem.tint = 0xff0000;
            totem.hitted=false;
            totem.stateON=false;
        }
    }
};
EnemyNinja = function (index,game,x,y,tweenLength,tweenTime){

    const ninja = ninjis.create(x, y, 'enemyNinja');
    ninja.hitted = hitted;
        ninja.hp = 50;
        ninja.aliveEnemy = aliveEnemy;
        ninja.RLways = true;
        ninja.xBorn = x;
        ninja.yBorn = y;
        ninja.tweenLength = tweenLength;
        ninja.tweenTime = tweenTime;
        ninja.enableBody = true;
        ninja.anchor.setTo(0.5,0.5);
        ninja.animations.add('ninjaLeft', [0, 1, 2, 3], 15, true);
        ninja.animations.add('ninjaRight', [4, 5, 6, 7], 15, true);
        ninja.name = index.toString();
        game.physics.enable(ninja, Phaser.Physics.ARCADE);
        ninja.body.immovable = true;
        ninja.body.collideWorldBounds = true;
        ninja.body.bounce.y = 0.2;
        ninja.body.allowGravity = false;
        ninja.animations.play('ninjaLeft');

        ninja.update = function(){
            if (ninja.x === ninja.xBorn) {
                ninja.RLways = true;
                const enemyNinjaTweenR = game.add.tween(ninja).to({
                    x: ninja.x + ninja.tweenLength
                }, tweenTime, Phaser.Easing.Linear.None, true);
                ninja.animations.play('ninjaRight');
            }
            ninja.tint = 0xFFFFFF;
            if (ninja.x === ninja.xBorn + ninja.tweenLength){
                ninja.RLways = false;
                const enemyNinjaTweenL = game.add.tween(ninja).to({
                    x: ninja.x - ninja.tweenLength
                }, tweenTime, Phaser.Easing.Linear.None, true);
                ninja.animations.play('ninjaLeft');
            }
            if (ninja.aliveEnemy===false){
                ninja.aliveEnemy=true;
                game.particleDeath(ninja);
                ninja.destroy();
            }
            if(ninja.hp===0){
                ninja.aliveEnemy=false;
            }
            if(ninja.hitted===true){
                ninja.hp = ninja.hp-damage;
                ninja.tint = 0xff0000;
                ninja.hitted=false;
            }
        }
    };

EnemyTree = function (index,game,x,y){

    const tree = trees.create(x, y, 'enemyTree');
    tree.hitted = hitted;
        tree.hp = 300;
        tree.aliveEnemy = aliveEnemy;
        tree.RLways = true;
        tree.xBorn = x;
        tree.yBorn = y;
        tree.enableBody = true;
        tree.anchor.setTo(0.5,0.5);
        tree.animations.add('treeLeft', [0, 1, 2, 3, 4,5,6,7,8,9,10,11], 5, true);
        tree.animations.add('treeRight', [23,22,21,20,19,18,17,16,15,14,13,12], 5, true);
        tree.name = index.toString();
        game.physics.enable(tree, Phaser.Physics.ARCADE);
        tree.body.immovable = true;
        tree.body.collideWorldBounds = true;
        tree.body.bounce.y = 0.2;
        tree.body.gravity.y = 200;
        //tree.scale.setTo(0.75,0.75);
        //tree.body.allowGravity = false;
        tree.animations.play('treeLeft');

        tree.update = function(){
            
            game.physics.arcade.moveToObject(tree, player, 50);
            if (tree.body.velocity.x > 0) {
                tree.RLways = true;
                tree.animations.play('treeRight');
                tree.tint = 0xFFFFFF;
            }
            if (tree.body.velocity.x < 0) {
                tree.RLways = false;
                tree.animations.play('treeLeft');
                tree.tint = 0xFFFFFF;
            }
            if (tree.aliveEnemy===false){
                    tree.aliveEnemy=true;
                    game.particleDeath(tree);
                    tree.destroy();
            }
            if(tree.hp===0){
                tree.aliveEnemy=false;
            }
            if(tree.hitted===true){
                tree.hp = tree.hp-damage;
                tree.hitted=false;
                tree.tint = 0x8000ff;
                if(tree.RLways===true){
                    tree.x=tree.x-2;
                }
                else{
                    tree.x=tree.x+2;
                } 
            }
        }
    };

EnemyBat = function (index,game,x,y){

    const bat = manybats.create(x, y, 'enemyBat');
    bat.hitted = hitted;
        bat.hp = 200;
        bat.aliveEnemy = aliveEnemy;
        bat.RLways = true;
        bat.xBorn = x;
        bat.yBorn = y;
        bat.enableBody = true;
        bat.anchor.setTo(0.5,0.5);
        bat.animations.add('batLeft', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
        bat.animations.add('batRight', [ 19, 18, 17, 16, 15, 14, 13, 12, 11, 10], 15, true);
        bat.name = index.toString();
        game.physics.enable(bat, Phaser.Physics.ARCADE);
        bat.body.immovable = true;
        //bat.scale.setTo(0.75,0.75);
        //bat.animations.play('batLeft');

        bat.update = function(){
            
            game.physics.arcade.moveToXY(bat, player.x,player.y-30, 50);
            if (bat.body.velocity.x > 0) {
                bat.RLways = true;
                bat.animations.play('batRight');bat.tint = 0xFFFFFF;
            }
            if (bat.body.velocity.x < 0) {
                bat.RLways = false;
                bat.animations.play('batLeft');bat.tint = 0xFFFFFF;
            }
            if (bat.aliveEnemy===false){
                    bat.aliveEnemy=true;
                    game.particleDeath(bat);
                    bat.destroy();
            }  
            if(bat.hp===0){
                bat.aliveEnemy=false;
            }
            if(bat.hitted===true){
                bat.hp = bat.hp-damage;
                bat.hitted=false;
                bat.tint = 0xff0000;             
            }

        }
    };

let textS = '     ?';
const textS1 = 'Hello bad-man!';
const textS2 = "Oh-oh, i'm sorry you just look very rich! Came on the hunt?";
const textS3 = 'What about those ugly guys? Are you afraid of them?';
const textS4 = 'I think you can handle them. Do it!';
const textS5 = 'Okey, see you next time!';
let endPlot = 0;

Plot = function (game,x,y,plotSprite){

    const plot = game.add.sprite(x, y, plotSprite);
    plot.xBorn = x;
    plot.yBorn = y;
    plot.enableBody = true;
    game.physics.enable(plot, Phaser.Physics.ARCADE);
    plot.animations.add('plotUsual', [ 0, 1, 2], 5, true);
    plot.body.bounce.y = 0.2;
    plot.body.immovable = true;
    plot.body.collideWorldBounds = true;
    plot.body.allowGravity = false;
    const speakButton = game.input.keyboard.addKey(Phaser.KeyCode.S);
    speakButton.onDown.add(rebuildScript);
    scenarioText = game.add.text(plot.xBorn-10, plot.yBorn-20, textS , { font: '16px Arial', fill: "#9802d4" });
    scenarioText.fontWeight = 'bold';
    plot.update = function(){
        plot.animations.play('plotUsual');
        game.physics.arcade.overlap(plot, player, plot.scenario, null, game);   
        if(endPlot===6){
            scenarioText.destroy();
        }  
        if((!checkOverlap(player,plot)) && speakButton.isDown){
            endPlot=0;
        }
    },

    plot.scenario = function(){
        scenarioText.setText(textS);
    }
};

function rebuildScript() {

    endPlot++;
    if (endPlot === 1) {
        textS = textS1;
    }
    if (endPlot === 2) {
        textS = textS2;
    }
    if (endPlot === 3) {
        textS = textS3;
    }
    if (endPlot === 4) {
        textS = textS4;
    }
    if (endPlot === 5) {
        textS = textS5;
    }
}
function Level2(){
        this.state.start('Level2');
    }
function reviveSword(){
        sword.revive();

    }
function reviveNinjas(game){
        ninjis.removeAll();
        game.createNinjis(game);
    }
function reviveTrees(game){
        trees.removeAll();
        game.createTrees(game);
    }
function reviveBats(game){
        manybats.removeAll();
        game.createBats(game);
    }
function reviveTotems(game){
        totems.removeAll();
        game.createTotems(game);
    }
function reviveLezo(game){
        lezos.removeAll();
        game.createLezo(game);
    }

function collisionHandlerSword(sword,enemy) {
        enemy.hitted = true;
        
    }

function checkOverlap(spriteA,spriteB){
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA,boundsB);

    }