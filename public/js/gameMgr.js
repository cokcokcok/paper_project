

var gameWidth = document.getElementById('phaser').offsetWidth;
var gameHeight = document.getElementById('phaser').offsetHeight;

var game;

game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS , 'phaser');

game.state.add('Title', demo.title);
game.state.add('Stage', demo.stage);
game.state.add('Var_Const', demo.var_const);
game.state.add('Type_System', demo.type);

game.state.start('Title');
