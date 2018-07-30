var demo = {};
var titleName;
var titleCompile = false;
var startBtn = false;
demo.title = function() {};

demo.title.prototype = {
  preload: function() {
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('startBtn', "images/title/startBtn.png");
    game.load.image('endBtn', "images/title/endBtn.png");
  },
  create: function() {
    var titleBk = new Array();
    for (var i = 0; i < 5; i++) {
      titleBk[i] = game.add.sprite(0, 0, 'titleBk' + i.toString());

    }

    titleName = game.add.text(game.world.centerX, 150, "게임이름을 지어주세요", {
      font: "bold 40px Arial",
      fill: "#ffffff"
    });

    titleName.anchor.set(0.5, 0.5);

    var startBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'startBtn', StartClick, this, 2, 1, 0);
    var endBtn = game.add.button(game.world.centerX, game.world.centerY + 100, 'endBtn', EndClick, this, 2, 1, 0);

    startBtn.anchor.set(0.5, 0.5);
    endBtn.anchor.set(0.5, 0.5);
  },
  update: function() {

  }
};

function StartClick() {
  if (titleCompile) {
    game.state.start('Stage');
    load.setInit();
  } else {
    alert('please compile');
  }

}

function EndClick() {
  // end button input code
}

function ChangeTitle(name) {
  if (!titleCompile) {
    titleCompile = true;
    user.title = user.title + 1;
    titleName.setText(name);
    user.selectStage = 0;
  }
}
