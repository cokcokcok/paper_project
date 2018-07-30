demo.fun = function() {};

var funUnit;
var funEnemy;
var funMovement = true;
demo.fun.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('basecamp', "images/play/basecamp.png");
	game.load.spritesheet('unit_club', "images/play/unit_club_sprite.png", 90, 90, 9);
	game.load.spritesheet('enemy_club', "images/play/enemy_club_sprite.png", 81, 90, 9);
  },
  create: function() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

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
	
	funUnit = game.add.sprite(50, gameHeight - 25, 'unit_club',1);
	funUnit.scale.set(1);
	funUnit.anchor.set(0, 1);
	funUnit.animations.add('walk', [0,1,2,3]);
	funUnit.animations.add('attack', [4,5,6,7,8]);
	funUnit.animations.play('walk', 5, true);

	funEnemy = game.add.sprite(gameWidth - 100, gameHeight - 25, 'enemy_club', 1);
	funEnemy.scale.set(1);
	funEnemy.anchor.set(0, 1);
	funEnemy.animations.add('walk', [0,1,2,3]);
	funEnemy.animations.play('walk', 5, true);	

	game.physics.enable(funUnit, Phaser.Physics.ARCADE);
	game.physics.enable(funEnemy, Phaser.Physics.ARCADE);

  },
  update: function() {
	if (game.physics.arcade.collide(funUnit, funEnemy)) {
		funUnit.animations.play('attack', 6, true);
		funEnemy.animations.stop('walk', null, true);
	}
	else {
		funUnit.x += 1.2;
		funEnemy.x -= 1.2;
	}
  }

};


