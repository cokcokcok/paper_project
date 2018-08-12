demo.arr = function() {};

var arrUnit;
var arrMovement = false;
demo.arr.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('successBtn', "images/all/successBtn.png");
    game.load.image('basecamp', "images/play/basecamp.png");
    game.load.spritesheet('unit_club', "images/play/unit_club_sprite.png", 90, 90, 9);
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

    arrUnit = game.add.sprite(50, gameHeight - 25, 'unit_club', 1);
    arrUnit.scale.set(1);
    arrUnit.anchor.set(0, 1);
    arrUnit.animations.add('basic');

  },
  update: function() {
    if (arrMovement) {
      arrUnit.play('basic', 5, true);

      if (arrUnit.animations.currentFrame.index < 4) {
        arrUnit.x += 1.2;
      }

      if (arrUnit.x > gameWidth) {
        arrMovement = false;
        setResultMsg_arr();
      }
    }

  }

};

function arrCompile(output) {
  var value = output.split(',');
  value.pop();

  if (!isCheckArr(value)) {
    alert(value);
    return;
  }
  arrMovement = true;

}

function isCheckArr(data) {
  if (data.length > 2) {
    return false;
  } else {
    if (data[0] == 'w' && data[1] == 'a') {
      return true;
    } else {
      return false;
    }
  }
}

function setResultMsg_arr() {
  var resultMsg = game.add.text(game.world.centerX, 150, "success", {
    font: "bold 40px Arial",
    fill: "#ffffff"
  });

  resultMsg.anchor.set(0.5, 0.5);

  var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickSuccessArr, this, 2, 1, 0);
  successBtn.anchor.set(0.5, 0.5);
}

function onClickSuccessArr() {
  user.selectStage = 0;
  user.stageList[5] += 1;
  load.updateData();
  load.updateErr();
  load.setInit();
  game.state.start('Stage');
}
