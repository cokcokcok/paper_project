demo.fun = function() {};

var funUnit;
var funEnemy;
var funMovement = true;
var tunPos = false;
var funCompileCheck = false;
demo.fun.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('basecamp', "images/play/basecamp.png");
    game.load.image('successBtn', "images/all/successBtn.png");
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

    funUnit = game.add.sprite(50, gameHeight - 25, 'unit_club', 1);
    funUnit.scale.set(1);
    funUnit.anchor.set(0, 1);
    funUnit.animations.add('walk', [0, 1, 2, 3]);
    funUnit.animations.add('attack', [4, 5, 6, 7, 8]);


    funEnemy = game.add.sprite(gameWidth - 100, gameHeight - 25, 'enemy_club', 1);
    funEnemy.scale.set(1);
    funEnemy.anchor.set(0, 1);
    funEnemy.animations.add('walk', [0, 1, 2, 3]);


    game.physics.enable(funUnit, Phaser.Physics.ARCADE);
    game.physics.enable(funEnemy, Phaser.Physics.ARCADE);

  },
  update: function() {
    if (game.physics.arcade.overlap(funUnit, funEnemy)) {
      if (!tunPos) {
        for (var i = 0; i < 20; i++) {
          funUnit.x += 1.2;
        }
        tunPos = true;
      }
      funUnit.animations.stop('walk', null, true);
      funUnit.animations.play('attack', 6, true);
      funEnemy.animations.stop('walk', null, true);
      if (funUnit.animations.currentFrame.index === 6) {
        funEnemy.kill();
        funCompileCheck = false;
        funUnit.animations.stop('attack', null, true);
        setResultMsg_fun();
      }
    } else {
      if(funCompileCheck) {
        funUnit.x += 1.2;
        funEnemy.x -= 1.2;

      }
    }
  }
};

function funCompile(data) {
  funEnemy.animations.play('walk', 5, true);
  funUnit.animations.play('walk', 5, true);
  funCompileCheck = true;
}

function setResultMsg_fun() {

  var resultMsg = game.add.text(game.world.centerX, 150, "success", {
    font: "bold 40px Arial",
    fill: "#ffffff"
  });

  resultMsg.anchor.set(0.5, 0.5);

  var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickSuccessFun, this, 2, 1, 0);

  successBtn.anchor.set(0.5, 0.5);


}

function onClickSuccessFun() {
  user.selectStage = 0;
  user.stageList[4] += 1;
  load.updateData();
  load.setInit();
  game.state.start('Stage');
}
