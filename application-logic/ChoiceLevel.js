Game.ChoiceLevel = function(game){


};



Game.ChoiceLevel.prototype = {

	create: function (game) {

		group = this.add.group();
		// Это будет автоматический inputEnable всех кнопок, добавленных группу
		group.inputEnableChildren = true;

		this.createButton(game, "1", game.world.centerX - 300, game.world.centerY - 210, 300, 100, 'buttonLevel', 40,
			function () {
				this.state.start('Level1');
			});
		this.createButton(game, "2", game.world.centerX - 100, game.world.centerY - 210, 300, 100, 'buttonLevel2', 40,
			function () {
				this.state.start('Level2');
			});
		this.createButton(game, "3", game.world.centerX + 100, game.world.centerY - 210, 300, 100, 'buttonLevel3', 40,
			function () {
				this.state.start('Level3');
			});
		this.createButton(game, "4", game.world.centerX + 300, game.world.centerY - 210, 300, 100, 'buttonLevel4', 40,
			function () {
				this.state.start('Level4');
			});
		this.createButton(game, "5", game.world.centerX - 260, game.world.centerY, 300, 100, 'buttonLevel5', 40,
			function () {
				this.state.start('Level5');
			});
		this.createButton(game, "6", game.world.centerX - 25, game.world.centerY, 300, 100, 'buttonLevel6', 40,
			function () {
				this.state.start('Level6');
			});
		this.createButton(game, "7", game.world.centerX + 210, game.world.centerY, 300, 100, 'buttonLevel7', 40,
			function () {
				this.state.start('Level7');
			});
		/*this.createButton(game, "8", game.world.centerX+300,game.world.centerY , 300, 100,'buttonLevel7',40,
			function(){
				this.state.start('Level8');
			});
		*/
		this.createButton(game, "Back", game.world.centerX + 300, game.world.centerY + 250, 300, 100, 'button', 0,
			function () {
				this.state.start('MainMenu');
			});
	},

	update: function (game) {

	},

	onDown: function (button) {
		button.tint = 0x8b1fde;
		this.camera.fade(0x000000, 2000);
	},

	onOver: function (button) {
		button.tint = 0xa8a7a8;
	},

	onOut: function (button) {
		button.tint = 0xffffff;
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