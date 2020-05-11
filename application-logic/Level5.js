Game.Level5 = function(game){

};


var player1;
var player;
var fireButton;
var attackState = false;
var swordCourse = true;
var emitter;
var facing = 'left';
var RLPlayer;
var jumpTimer = 0;
var jumpButton;
var sword;

var map;
var tileset;
var layer;
var cursors;
var bg;
var angleSword = 0;

var stopEmitterDeath = false;
var aliveEnemy = true;
var hp =100;
var ninjis;
var tweenLength;
var tweenTime;
var xBorn;
var yBorn;
var RLways;


var trees;
var hitted =false;
var manybats;

var checkPointers;
var activateState = false;
var weapon;


Game.Level5.prototype = {


    preload: function () {

        this.load.spritesheet('gun', 'assets/games/starstruck/Gun2.png', 50, 26);

        this.load.image('background5', 'assets/games/starstruck/Map5.png');

        this.load.tilemap('level5', 'assets/games/starstruck/L5.json', null, Phaser.Tilemap.TILED_JSON);

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

        map = this.add.tilemap('level5');

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

        new CheckPointer(1, this, 1588, 546);

        new Ends(this, 1900, 900, Level6);

        xCoordinateComeback = 100;
        yCoordinateComeback = 100;

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

        new EnemyNinja(0, this, 580, 460, 395, 3000);
        new EnemyNinja(0, this, 640, 460, 370, 3000);
        new EnemyNinja(0, this, 736, 460, 230, 3000);

        new EnemyNinja(1, this, 518, 715, 535, 4000);
        new EnemyNinja(1, this, 608, 715, 425, 3000);
        new EnemyNinja(1, this, 890, 715, 150, 3000);

        new EnemyNinja(2, this, 160, 970, 500, 5000);

        new EnemyNinja(3, this, 1312, 810, 256, 3000);
        new EnemyNinja(3, this, 1280, 588, 320, 3000);
        new EnemyNinja(3, this, 1167, 634, 100, 1000);
        new EnemyNinja(3, this, 1312, 475, 220, 3000);
        new EnemyNinja(3, this, 1248, 380, 300, 2000);

        new EnemyNinja(4, this, 1760, 395, 220, 3000);
        new EnemyNinja(4, this, 1984, 330, 80, 1000);
        new EnemyNinja(4, this, 2080, 475, 180, 2000);
        new EnemyNinja(4, this, 1696, 555, 400, 3000);


    },
    createTrees: function () {

        new EnemyTree(0, this, 752, 900);
        new EnemyTree(0, this, 850, 900);

        new EnemyTree(1, this, 2006, 866);

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

function createNinjis2(game) {

    new EnemyNinja(0, game, 850, 493, 700, 5000);
    new EnemyNinja(1, game, 1900, 363, 170, 2000);
    new EnemyNinja(2, game, 2140, 493, 500, 5000);
    new EnemyNinja(3, game, 3090, 430, 125, 1000);
    new EnemyNinja(4, game, 3090, 268, 160, 2000);
    new EnemyNinja(5, game, 3600, 110, 600, 5000);
    new EnemyNinja(6, game, 3600, 493, 650, 5000);
    new EnemyNinja(7, game, 3850, 493, 650, 5000);
    new EnemyNinja(8, game, 4330, 75, 170, 2000);
    new EnemyNinja(9, game, 4850, 268, 450, 5000);
    new EnemyNinja(10, game, 4800, 493, 600, 5000);
    new EnemyNinja(11, game, 5350, 140, 190, 2000);
}
function createTrees2(game) {

    new EnemyTree(0, game, 500, 350);
    new EnemyTree(1, game, 1900, 300);
    new EnemyTree(2, game, 2140, 350);

}

function createBats2(game) {

    new EnemyBat(0, game, 300, 200);
    new EnemyBat(1, game, 1900, 200);
    new EnemyBat(2, game, 2140, 200);

}

Player1 = function(game,x,y) {
    //<Игрок>
    player = game.add.sprite(x, y, 'dude');
    player.RLPlayer = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.points = 0;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 15, true);
    player.animations.add('turn', [1], 20, true);
    player.animations.add('right', [4, 5, 6, 7], 15, true);
    player.animations.add('idleLeft', [8, 9, 10], 7, true);
    player.animations.add('idleRight', [12, 13, 14], 7, true);
    player.anchor.setTo(0.5, 0.5);
    game.camera.follow(player);
    //</Игрок>

    player.update = function () {

        //<Интерфейс плейера>

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            game.particleBurst();
            RLPlayer = true;
            weapon.fireAngle = 185;
            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';

            }

        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            game.particleBurst();
            RLPlayer = false;
            weapon.fireAngle = 356;
            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }

        } else {
            if (facing != 'idle') {
                player.animations.stop();
                if (facing == 'left') {
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

        //</Интерфейс плейера>
    }
};

Gun = function (game,x,y) {

    //<Оружие>
    gun = game.add.sprite(x, y, 'gun');
    //<Выстрел>            
    weapon = game.add.weapon(30, 'bullet');//  Creates 30 bullets, using the 'chunk1' graphic
    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;//  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletSpeed = 1000;//  The speed at which the bullet is fired
    weapon.fireRate = 400; //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireAngle = 355;// Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleVariance = 10;
    //</Выстрел> 
    damage = 50;
    //<Оружие>
    game.physics.enable(gun, Phaser.Physics.ARCADE);
    gun.enableBody = true;
    gun.body.collideWorldBounds = true;
    gun.body.allowGravity = false;
    gun.animations.add('gunLeft', [1], 15, true);
    gun.animations.add('gunRight', [0], 15, true);
    gun.body.velocity.x = 0;
    gun.body.velocity.y = 0;
    //</Оружие>
    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(gun, 0, 0, false);
    game.camera.SHAKE_HORIZONTAL = true;

    gun.update = function () {

        game.physics.arcade.moveToXY(gun, player.x, player.y, 100, 50);
        game.physics.arcade.collide(weapon.bullets, layer, collisionBullet);
        game.physics.arcade.overlap(weapon.bullets, ninjis, collisionHandlerGun, null, game);
        game.physics.arcade.overlap(weapon.bullets, trees, collisionHandlerGun, null, game);
        game.physics.arcade.overlap(weapon.bullets, manybats, collisionHandlerGun, null, game);
        game.physics.arcade.overlap(weapon.bullets, totems, collisionHandlerGun, null, game);


        if (fireButton.isDown) {
            weapon.fire();
            game.camera.shake(0.0005, 30);
            if (player.RLPlayer == false) {
                gun.anchor.setTo(0.5, 0.5);
                //weapon.fireFrom.setTo(0.9, 0.9);
                gun.animations.play('right');
                //weapon.fireAngle = 356;                    
            } else if (player.RLPlayer == true) {
                gun.anchor.setTo(0.5, 0.5);
                //weapon.fireFrom.setTo(0.1, 0.1);
                gun.animations.play('left');
                //weapon.fireAngle = 185;                     
            }
        } else {
            if (RLPlayer == true) {
                gun.anchor.setTo(0.75, 0.5);
                gun.frame = 1;
                //weapon.fireAngle = 185;
            } else if (RLPlayer == false) {
                gun.anchor.setTo(0.25, 0.5);
                gun.frame = 0;
                // weapon.fireAngle = 356; 
            }
            gun.animations.stop();
        }

    }
};
function Level6() {
    this.state.start('Level6');
}
function reviveGun() {
    gun.revive();
}
function collisionHandlerGun(bullet,enemy) {
    enemy.hitted = true;
    bullet.kill();
}
function collisionBullet(bullet) {
    bullet.kill();
}