  demo.var_const = function() {};
  var info;
  var successCheck = false;
  demo.var_const.prototype = {

    preload: function() {
      game.load.image('titleBk0', "images/all/plx-1.png");
      game.load.image('titleBk1', "images/all/plx-2.png");
      game.load.image('titleBk2', "images/all/plx-3.png");
      game.load.image('titleBk3', "images/all/plx-4.png");
      game.load.image('titleBk4', "images/all/plx-5.png");
      game.load.image('unit_club', "images/play/unit_club.png");
      game.load.image('successBtn', "images/all/successBtn.png");
    },
    create: function() {
      for (var i = 0; i < 5; i++) {
        game.add.sprite(0, 0, 'titleBk' + i.toString());
      }

      var bricks = game.add.graphics(100, 45);
      var unit_club_info_name = new Array();
      var unit_club_info = new Array();

      bricks.beginFill(0xFFFFFF, 1);
      bricks.drawRoundedRect(0, 0, 250, 300, 20);

      for (var i = 0; i < 4; i++) {
        unit_club_info_name[i] = game.add.graphics(400, 45 + (i * 75));
        unit_club_info[i] = game.add.graphics(510, 45 + (i * 75));

        unit_club_info_name[i].beginFill(0xFFFFFF, 1);
        unit_club_info[i].beginFill(0xFFFFFF, 1);

        unit_club_info_name[i].drawRoundedRect(0, 0, 100, 70);
        unit_club_info[i].drawRoundedRect(0, 0, 150, 70);
      }

      game.add.sprite(bricks.position.x + 25, bricks.position.y + 10, 'unit_club');

      var lvText = game.add.text(unit_club_info_name[0].position.x + 50,
        unit_club_info_name[0].position.y + 37.5, "레   벨", {
          font: "bold 20px Arial",
          fill: "#000000"
        });
      var hpText = game.add.text(unit_club_info_name[1].position.x + 50,
        unit_club_info_name[1].position.y + 37.5, "체   력", {
          font: "bold 20px Arial",
          fill: "#000000"
        });
      var attackText = game.add.text(unit_club_info_name[2].position.x + 50,
        unit_club_info_name[2].position.y + 37.5, "공 격 력", {
          font: "bold 20px Arial",
          fill: "#000000"
        });
      var defensiveText = game.add.text(unit_club_info_name[3].position.x + 50,
        unit_club_info_name[3].position.y + 37.5, "방 어 력", {
          font: "bold 20px Arial",
          fill: "#000000"
        });

      lvText.anchor.set(0.5, 0.5);
      hpText.anchor.set(0.5, 0.5);
      attackText.anchor.set(0.5, 0.5);
      defensiveText.anchor.set(0.5, 0.5);

      info = new Array();

      info[0] = game.add.text(unit_club_info[0].position.x + 75,
        unit_club_info[0].position.y + 37.5, "1", {
          font: "bold 20px Arial",
          fill: "#000000"
        });

      info[1] = game.add.text(unit_club_info[1].position.x + 75,
        unit_club_info[1].position.y + 37.5, "100", {
          font: "bold 20px Arial",
          fill: "#000000"
        });

      info[2] = game.add.text(unit_club_info[2].position.x + 75,
        unit_club_info[2].position.y + 37.5, "8", {
          font: "bold 20px Arial",
          fill: "#000000"
        });

      info[3] = game.add.text(unit_club_info[3].position.x + 75,
        unit_club_info[3].position.y + 37.5, "2", {
          font: "bold 20px Arial",
          fill: "#000000"
        });

      for (var i = 0; i < 4; i++) {
        info[i].anchor.set(0.5, 0.5);
      }

    },
    update: function() {}
  };

  function ChangeInfo(output) {
    var value = output.split(',');

    if(!isSuccessCheck_var(value)) {
      alert("모든 값이 변경되지 않았습니다.")
      return;
    }

    for (var i = 0; i < 3; i++) {
      info[i + 1].setText(value[i]);
    }

    var resultBk = game.add.graphics(game.world.centerX - 200, game.world.centerY - 150);
    resultBk.beginFill(0x999999, 1);
    //resultBk.anchor.set(0.5, 0.5);
    resultBk.alpha = 0.5;
    resultBk.drawRoundedRect(0, 0, 400, 300, 20);

    var resultMsg = game.add.text(game.world.centerX, 150, "success", {
      font: "bold 40px Arial",
      fill: "#ffffff"
    });

    resultMsg.anchor.set(0.5, 0.5);

    var successBtn = game.add.button(game.world.centerX, game.world.centerY + 50, 'successBtn', onClickSuccess_var, this, 2, 1, 0);

    successBtn.anchor.set(0.5, 0.5);
  }

  function isSuccessCheck_var(data) {
    if (data[1] == "100" || data[2] == "8", data[3] == "2") {
      return false;
    }
    else {
      return true;
    }
  }

  function onClickSuccess_var() {
    user.stageList[0] = user.stageList[0] + 1;
    user.selectStage = 0;
    load.updateData();
    load.updateErr();
    load.setInit();
    game.state.start('Stage');
  }
