demo.condition = function() {};

var enemy;
var movementEnemy = false;
var attack = false;
var tree_hp = 40;
var tree;
var frame = 0;

demo.condition.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('basecamp', "images/play/basecamp.png");
    game.load.image('successBtn', "images/all/successBtn.png");
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

	tree = game.add.text(80, gameHeight - (gameHeight * 0.7), "hp: " + String(tree_hp), {
		font: "bold 20px Arial",
		fill: "#ff0000"
	});
	
	tree.anchor.set(0, 1);

  },
  update: function() {
    if (tree_hp > 0) {
      if (movementEnemy) {
        enemy.x -= 2.1;

        if (enemy.x < 5) {
          enemy.animations.add('attack', [4, 5, 6, 7, 8]);
          enemy.animations.play('attack', 5, true);
          movementEnemy = false;
          attack = true
        }
      }

      if (attack) {
        if (enemy.animations.currentFrame.index == 6) {
          frame += 1;
        } else {
          frame = 0;
        }
      }

      if (frame > 11) {
        tree_hp -= 5;
		tree.setText("hp: " + String(tree_hp));
        if (tree_hp <= 0) {
          enemy.animations.stop(null, true);
          setResultMsg("end");
        }
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
  enemy.animations.add('walk', [0, 1, 2, 3]);
  enemy.animations.play('walk', 5, true);

  movementEnemy = true;

}

function setResultMsg(msg) {

  var resultMsg = game.add.text(game.world.centerX, 150, msg, {
    font: "bold 40px Arial",
    fill: "#ffffff"
  });

  resultMsg.anchor.set(0.5, 0.5);

  var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickSuccess, this, 2, 1, 0);

  successBtn.anchor.set(0.5, 0.5);


}

function onClickSuccess() {
  user.selectStage = 0;
  user.stageList[2] += 1;
  load.updateData();
  load.updateErr();
  load.setInit();
  game.state.start('Stage');
}
