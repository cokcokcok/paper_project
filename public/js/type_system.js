demo.type = function(){};

var club = new Array();
var club_anim;
var movement;
var speed;
demo.type.prototype = {
  preload: function(){
    game.load.image('titleBk0', "images/all/plx-1.png");
    game.load.image('titleBk1', "images/all/plx-2.png");
    game.load.image('titleBk2', "images/all/plx-3.png");
    game.load.image('titleBk3', "images/all/plx-4.png");
    game.load.image('titleBk4', "images/all/plx-5.png");
    game.load.image('road', "images/play/road.png")
    game.load.image('basecamp', "images/play/basecamp.png")
    game.load.spritesheet('unit_club_walk', "images/play/unit_club_walk.png", 87, 90, 4);
  },
  create: function(){
    for(var i = 0; i < 5; i++) {
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
  update: function(){

};

function TypePlay(output) {
  var value = output.split(',');

  club_anim = new Array();


  var len = Number(value[0]);

  for (var i = 0; i < len; i++) {
    var posX = randomRange(0, 200);
    club[i] = game.add.sprite(posX, gameHeight - 25, 'unit_club_walk', 1);
    club[i].scale.set(1);
    club[i].anchor.set(0, 1);
    club[i].smoothed = false;
    club_anim[i] = club[i].animations.add(value[1]);
    club_anim[i].play(5, true);
  }

  speed = parseFloat(value[2]);
  movement = true;

}
function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}
