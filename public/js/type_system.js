demo.type = function() {};

var club = new Array();
var club_anim;
var movement = false;
var speed;
demo.type.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png")
    game.load.image('basecamp', "images/play/basecamp.png")
    game.load.image('successBtn', "images/all/successBtn.png");
    game.load.spritesheet('unit_club_walk', "images/play/unit_club_sprite.png", 90, 90, 9);
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
    if (movement) {
      for (var i = 0; i < 5; i++) {
        club[i].x += speed;
      }

      if (club[4].x > gameWidth) {
        successType();
      }
    }
  }
};

function TypePlay(output) {
  var value = output.split(',');

  club_anim = new Array();

  if (!isCheckResult(value)) {
    alert("modify code please");
    return;
  }

  var len = Number(value[0]);

  for (var i = 0; i < len; i++) {
    var posX = randomRange(0, 200);
    club[i] = game.add.sprite(posX, gameHeight - 25, 'unit_club_walk', 1);
    club[i].scale.set(1);
    club[i].anchor.set(0, 1);
    club[i].smoothed = false;
    club_anim[i] = club[i].animations.add(value[1], [0, 1, 2, 3]);
    club_anim[i].play(5, true);
  }

  speed = parseFloat(value[2]);
  movement = true;

}

function randomRange(n1, n2) {
  return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}

function isCheckResult(arr) {
  if (arr[0] != "5" || arr[1] != "w" || arr[2] != "2.5") {
    return false;
  } else {
    return true;
  }
}

function successType() {
  var resultMsg = game.add.text(game.world.centerX, 150, "success", {
    font: "bold 40px Arial",
    fill: "#ffffff"
  });

  resultMsg.anchor.set(0.5, 0.5);

  var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickSuccess_type, this, 2, 1, 0);

  successBtn.anchor.set(0.5,0.5);

}

function onClickSuccess_type() {
  user.stageList[1] += 1;
  user.selectStage = 0;
  load.updateData();
  load.setInit();
  game.state.start('Stage');
}
