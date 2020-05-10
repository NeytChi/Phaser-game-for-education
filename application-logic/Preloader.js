Game.Preloader = function(game){

		this.preloadBar = null;
};

var musicOption = true;
var music;

Game.Preloader.prototype = {

 create:function(){

  	this.state.start('MainMenu');

  	if(musicOption==true){

  		music =  this.add.audio('KingDead');

		music.play();
  	}
  	

},

	preload:function(){

		this.load.audio('KingDead', 'assets/images/KingsDead.mp3');

		this.load.spritesheet('optionFrame', 'assets/images/Option.png', 45, 34);

	  	this.load.image('tiled', 'assets/games/starstruck/tiled.png');	

	  	this.load.image('titlescreenInstruction','assets/images/Instr.png');

	  	this.load.image('titlescreenInstructionMS','assets/images/InstrMusicS.png');

	  	this.load.image('titlescreen','assets/images/Mask.jpg');

	  	this.load.image('end','assets/games/starstruck/end.png');

	  	this.load.image('button','assets/images/button1.png');

	  	this.load.image('buttonLevel','assets/images/Level.png');
	  	this.load.image('buttonLevel2','assets/images/Level2.png');
	  	this.load.image('buttonLevel3','assets/images/Level3.png');
	  	this.load.image('buttonLevel4','assets/images/Level4.png');
	  	this.load.image('buttonLevel5','assets/images/Level5.png');
	  	this.load.image('buttonLevel6','assets/images/Level6.png');
	  	this.load.image('buttonLevel7','assets/images/Level7i.png');


	  	this.load.spritesheet('gold', 'assets/games/starstruck/gold.png', 23, 22);

	  	this.load.spritesheet('dude', 'assets/images/TiledPlayerExper.png', 33, 50);

		this.load.spritesheet('enemyNinja', 'assets/images/EnemySkelet.png', 33, 44);

		this.load.spritesheet('enemyTree', 'assets/games/starstruck/ETree.png', 57, 150);

		this.load.spritesheet('enemyBat', 'assets/games/starstruck/BatSprite.png', 83, 59);

		this.load.spritesheet('enemyTotem', 'assets/games/starstruck/totem.png', 60	, 70);

		this.load.spritesheet('checkPointer', 'assets/games/starstruck/checkpoint.png',70,120);

		this.load.image('chunkDeath1', 'assets/games/starstruck/chunk1.png');

        this.load.image('chunkDeath2', 'assets/games/starstruck/chunk2.png');

        this.load.image('chunk', 'assets/games/starstruck/chunk3.png');
	
        this.load.image('bullet', 'assets/games/starstruck/bullet.png');

        this.load.image('lezo', 'assets/games/starstruck/lezoB.png');

        this.load.image('jumper', 'assets/games/starstruck/jumper1.png');
	}
};


