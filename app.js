// create server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router/main')(app);
const io = require('socket.io')(server);

// connect address
const port = 3000;

// connect mysql
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'paper_root',
  database: 'paper'
});

// code compile
const compiler = require('compilex');
const option = {
  stats: true
};
compiler.init(option);

// user data
function UserData() {
	this.name = "abc";
	this.title = 0;
	this.stageList = [];
};

UserData.prototype.setInit = function(name, title, stageList) {
	this.name = name;
	this.title = title;
	this.stageList = stageList;
};

UserData.prototype.setName = function(name) {
	this.name = name;
};

UserData.prototype.setStage = function(stageNo, val) {
	this.stageList[stageNo] = val;
};

var user = new UserData();

// file read write
var fs = require('fs');

// use static file
app.use(express.static('public'));

// set rendering engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// socket io server connect
io.on('connection', function(socket) {
  console.log("connect server");
  // source code cmpile
  socket.on('compile', function(data) {
    var code = data.code;
    var envData = {
      OS: "linux",
      cmd: "gcc"
    };

    // cpp file compile
    compiler.compileCPP(envData, code, function(result) {
      if (result.error) {
        // send error message
        socket.emit('compile_error', result.error);
        console.log(result.error);
      } else {
        // send compile result
        socket.emit('compile_success', result.output);
        console.log(result.output);
      }
    });
  });

  // join_main
  socket.on('join_main', function(){
	console.log("in join_main");
	socket.emit('init_user', {
		name : user.name,
		title : user.title,
		list : user.stageList
	});
  });
  // quest data load
  socket.on('init_quest', function(data) {
	var path = "./public/question/" + data + ".txt";

	var question = fs.readFileSync(path, 'utf-8');
	socket.emit('get_quest', question);
  });

  // user data update
  socket.on('data_update', function(data) {
	console.log(data.list);
	// db
	var query = "UPDATE user_info SET title=?, stage1=?, stage2=?, stage3=?, stage4=?, stage5=?, stage6=? WHERE name=?";
	var params = [data.title, data.list[0],data.list[1],data.list[2],data.list[3],data.list[4],data.list[5],data.name];
	db.query(query, params, function(err, result, fields) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(result);
		}
	});
  });
  // login
  socket.on('signin', function(data) {

    var id = data.id;
    var pw = data.pw;

	if(!id) {
		socket.emit('check_signin', {
			msg : "empty id"
		});
		return;
	}
	if(!pw) {
		socket.emit('check_signin', {
			msg : "empty pw"
		});
		return;
	}
    // db
    var query = "SELECT * FROM user_info WHERE `name`=?";
    var params = id;

    // login query
    db.query(query, params, function(err, result, fields) {
      if (err) {
        console.log(err);
        //send client
        socket.emit('check_signin', {
			msg : "username does not exist"

		});
      } else {
        if (pw == result[0].user_pw) {
		  var stageList = [result[0].stage1, result[0].stage2, result[0].stage3, result[0].stage4, result[0].stage5, result[0].stage6];
		  user.setInit(id, result[0].title, stageList);
          socket.emit('check_signin', {
			msg : "success",
		  });
        } else {
          socket.emit('check_signin', {
			msg : "invalid password"
		  });
        }
      }
    });

  });

  // sign up
  socket.on('signup', function(data) {

    var id = data.id;
    var pw = data.pw;

	if(!id) {
		socket.emit('check_signup',"empyt id");
		return;
	}
	if(!pw) {
		socket.emit('check_signup', "empty pw");
		return;
	}

    // db
    var query = "INSERT INTO user_info VALUES(?,?,?,?,?,?,?,?,?);";
    var params = [id, pw, 0, 0, 0, 0, 0, 0, 0];

    // sign up query
    db.query(query, params, function(err, result, fields) {
      if (!err) {
        // send success
        socket.emit('check_signup', "success");
      } else {
        // send faile
        socket.emit('check_signup', "fail");
        console.log("mysql error");
        console.log(err);
      }
    });

  });

  socket.on('forceDisconnect', function() {
    socket.disconnect();
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is runnint at http://117.16.44.70:${port}`);
});
