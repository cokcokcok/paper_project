demo.loop = function() {};

var loopUnit = new Array();

demo.loop.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png");
    game.load.image('basecamp', "images/play/basecamp.png");
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

  }

};

function loopCompile(data) {
	var value = data.split('\n');
	value.pop();
	if (!checkLoopResult(value)) {
		return;
	}

	for (var i = 0; i < value.length; i++) {
		loopUnit[i] = game.add.sprite(i * 50, gameHeight - 25, 'unit_club_walk', 1);
		loopUnit[i].scale.set(1);
		loopUnit[i].anchor.set(0, 1);
		loopUnit[i].animations.add('walk', [0,1,2,3]);
		loopUnit[i].play('walk', 5, true);
	}
	
	var resultMsg = game.add.text(game.world.centerX, 150, "success", {
     font: "bold 40px Arial",
     fill: "#ffffff"
   });
 
   resultMsg.anchor.set(0.5, 0.5);
 
   var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickLoop, this, 2, 1, 0);
 
   successBtn.anchor.set(0.5, 0.5);

	
}


function checkLoopResult(data) {
	if (data.length == 5 && data[0] == "유닛") {
		return true;
	}
	else {
		return false;
	}
}

function onClickLoop() {
	user.selectStage = 0;
	user.stageList[3] += 1;
	load.updateData();
	load.setInit();
	game.state.start('Stage');
}
