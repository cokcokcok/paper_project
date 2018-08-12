demo.fun = function() {};

var funUnit;
var funUnitList = Array();
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

    // funUnit = game.add.sprite(50, gameHeight - 25, 'unit_club', 1);
    // funUnit.scale.set(1);
    // funUnit.anchor.set(0, 1);
    // funUnit.animations.add('walk', [0, 1, 2, 3]);
    // funUnit.animations.add('attack', [4, 5, 6, 7, 8]);

  },
  update: function() {
    if (funCompileCheck) {
      for(var i = 0; i < 5; i++) {
        funUnitList[i].x += 1.2;
      }
      if (funUnitList[0].x >= gameWidth) {
        setResultMsg_fun();
      }
    }
  }
};

function funCompile(data) {

  var value = data.split(",");
  value.pop();

  if (!isSuccessCheck_fun(value)) {
    alert("깂을 확인해 주세요");
    return;
  }

  for (var i = 0; i < 5; i++) {
		funUnitList[i] = game.add.sprite((50 * i), (gameHeight - 25), 'unit_club', 1);
		funUnitList[i].scale.set(1);
		funUnitList[i].anchor.set(0, 1);
		funUnitList[i].animations.add('walk', [0,1,2,3]);
		funUnitList[i].play('walk', 5, true);
	}

  funCompileCheck = true;
}

function isSuccessCheck_fun(data) {
  if (data[0] == "unit" && data.length == 5) {
    return true;
  } else {
    return false;
  }
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
  load.updateErr();
  load.setInit();
  game.state.start('Stage');
}
