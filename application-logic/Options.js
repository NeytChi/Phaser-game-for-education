Game.Options = function(game){


};

var titlescreenInstruction;
var groupOptionsMS;

Game.Options.prototype = {

	create: function (game) {


		titlescreenInstruction = game.add.sprite(game.world.centerX - 370, game.world.centerY - 295, 'titlescreenInstruction');

		titlescreen.anchor.setTo(0.5, 0.5);


		group = this.add.group();
		// Это будет автоматический inputEnable всех кнопок, добавленных группу
		group.inputEnableChildren = true;

		groupOptionsMS = this.add.group();

		titlescreenInstructionMS = game.add.sprite(game.world.centerX - 370, game.world.centerY + 95, 'titlescreenInstructionMS');

		this.createOption(game, game.world.centerX - 200, game.world.centerY + 110,
			function () {

				if (musicOption == false) {
					musicOption = true;
					music.mute = false;
				} else if (musicOption == true) {
					musicOption = false;
					music.mute = true;
				}

			});
		this.createOption(game, game.world.centerX - 200, game.world.centerY + 180,
			function () {

				if (musicOption == false) {
					//musicOption = true;
					//music.mute = false;
				} else if (musicOption == true) {
					//musicOption = false;
					//music.mute = true;
				}

			});

		this.createButton(game, "Back", game.world.centerX + 300, game.world.centerY + 250, 300, 100, 'button', 0,
			function () {
				this.state.start('MainMenu');
			});
	},

	update: function (game) {

	},

	onDown: function (button) {
		button.tint = 0x8b1fde;
		//this.camera.fade(0x000000, 2000);
	},

	onOver: function (button) {
		button.tint = 0xa8a7a8;
	},

	onOut: function (button) {
		button.tint = 0xffffff;
	},
	createOption: function (game, x, y, callback) {

		var option = game.add.button(x, y, 'optionFrame', callback, this);

		option.anchor.setTo(0.5, 0.5);
		//button1.wigth = w;
		//button1.height = h;

		option.frame = 1;

		groupOptionsMS.add(option);

		groupOptionsMS.onChildInputDown.add(this.onDown, this);

		groupOptionsMS.onChildInputOver.add(this.onOver, this);

		groupOptionsMS.onChildInputOut.add(this.onOut, this);

		option.update = function () {
			if (musicOption == true) {
				option.frame = 0;
			} else if (musicOption == false) {
				option.frame = 1;
			}
		}

	},
	createButton: function (game, string, x, y, w, h, stringPic, textY, callback) {
		var button1 = game.add.button(x, y, stringPic, callback, this, 2, 1, 0);

		button1.anchor.setTo(0.5, 0.5);
		//button1.wigth = w;
		//button1.height = h;

		group.add(button1);

		group.onChildInputDown.add(this.onDown, this);

		group.onChildInputOver.add(this.onOver, this);

		group.onChildInputOut.add(this.onOut, this);

		var txt = game.add.text(button1.x, button1.y + textY, string, {
			font: "14px Arial",
			fill: "#fff",
			align: "center"
		});
		txt.anchor.setTo(0.5, 0.5);
	}
};