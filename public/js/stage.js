demo.stage = function() {};

demo.stage.prototype = {
  preload: function() {
    for (var i = 1; i <= 6; i++) {
      game.load.image('StageBtn' + i.toString(), "images/stage/stage-button-" + i.toString() + ".png");
    }

  },
  create: function() {
    for (var i = 0; i < 5; i++) {
      game.add.sprite(0, 0, 'titleBk' + i.toString());
    }

    var stageBtn = new Array();

    stageBtn[0] = game.add.button(180, 150, 'StageBtn1', function() {
      StageClick(1)
    }, this, 2, 1, 0);
    stageBtn[1] = game.add.button(360, 150, 'StageBtn2', function() {
      StageClick(2)
    }, this, 2, 1, 0);
    stageBtn[2] = game.add.button(540, 150, 'StageBtn3', function() {
      StageClick(3)
    }, this, 2, 1, 0);
    stageBtn[3] = game.add.button(180, 250, 'StageBtn4', function() {
      StageClick(4)
    }, this, 2, 1, 0);
    stageBtn[4] = game.add.button(360, 250, 'StageBtn5', function() {
      StageClick(5)
    }, this, 2, 1, 0);
    stageBtn[5] = game.add.button(540, 250, 'StageBtn6', function() {
      StageClick(6)
    }, this, 2, 1, 0);

    for (var i = 0; i < 6; i++) {
      stageBtn[i].anchor.set(0.5, 0.5);
    }

  },
  update: function() {

  }
};

function StageClick(btnId) {
  switch (btnId) {
    case 1:
      game.state.start('Var_Const');
      break;
    case 2:

      break;

    case 3:

      break;
    case 4:

      break;
  }
}
