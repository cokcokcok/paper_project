demo.condition = function() {};

var enemy;
var enemy_walk;
var enemy_attack;
var movement = false;

demo.condition.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('basecamp', "images/play/basecamp.png");
	game.load.spritesheet('enemy_club', "images/play/enemy_club_sprite.png", 81, 90, 9);
  },
  create: function() {
    for (var i = 0; i < 5; i++) {
      game.add.sprite(0, 0, 'titleBk' + i.toString());
    }

    var gameRoad = new Array();
    for (var i = 0; i < 5; i++) {
      gameRoad[i] = game.add.sprite(160 * i, gameHeight, 'road');
      gameRoad[i].anchor.set(0, 1);
    }

    var basecamp = game.add.sprite(0, gameHeight - 32, 'basecamp');
    basecamp.anchor.set(0.48, 1);

  },
  update: function() {
	if(movement) {
		enemy.x -= 1.1;
		
		if(enemy.x < 20) {
			//enemy_walk.stop(null, true);
			enemy_attack.play(6, true);
			movement = false;
		}
	}
  }

};

function isPlayCondition(output) {
	var value = output;
	
	if (value != "end") {
		return;
	}
	enemy = game.add.sprite(gameWidth - 100, gameHeight - 25, 'enemy_club', 1);
	enemy.scale.set(1);
	enemy.anchor.set(0, 1);
	enemy.smoothed = false;	
	enemy_walk = enemy.animations.add('walk', [0,1,2,3]);
	enemy_walk.play(5, true);
	enemy_attack = enemy.animations.add('attack', [4,5,6,7,8]);
	//enemy_attack.stop(null, true);
	movement = true;
	
}
