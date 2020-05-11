Game.MainMenu = function(game){


};


var titlescreen;
var group;


Game.MainMenu.prototype = {

	create: function (game) {


		titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'titlescreen');

		titlescreen.anchor.setTo(0.5, 0.5);

		group = this.add.group();
		//  This will automatically inputEnable all children added to both Groups
		group.inputEnableChildren = true;

		var PlayButton = this.createButton(game, "Play", game.world.centerX, game.world.centerY + 130, 300, 50, 'button',
			function () {
				this.state.start('ChoiceLevel');
			});
		var OptionButton = this.createButton(game, "Option", game.world.centerX, game.world.centerY + 180, 300, 50, 'button',
			function () {
				this.state.start('Options');
			});
		var ExitButton = this.createButton(game, "Exit", game.world.centerX, game.world.centerY + 230, 300, 50, 'button',
			function () {
				window.open("exit.html");
			});


	},

	update: function (game) {

	},

	onDown: function (button) {
		button.tint = 0x8b1fde;
	},

	onOver: function (button) {
		button.tint = 0xa8a7a8;
	},

	onOut: function (button) {
		button.tint = 0xffffff;
	},

	flash: function () {
		this.camera.flash(0xa8a7a8, 1500);
	},

	createButton: function (game, string, x, y, w, h, stringPic, callback) {
		var button1 = game.add.button(x, y, stringPic, callback, this, 2, 1, 0);

		button1.anchor.setTo(0.5, 0.5);
		button1.wigth = w;
		button1.height = h;

		group.add(button1);

		group.onChildInputDown.add(this.onDown, this);

		group.onChildInputOver.add(this.onOver, this);

		group.onChildInputOut.add(this.onOut, this);

		var txt = game.add.text(button1.x, button1.y, string, {
			font: "14px Arial",
			fill: "#fff",
			align: "center"
		});
		txt.anchor.setTo(0.5, 0.5);
	}
};