// create server
const express =require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router/main')(app);
const io = require('socket.io')(server);

// connect address
const port = 3000;

// connect mysql
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'paper_root',
  database : 'paper'
});

// code compile
const compiler = require('compilex');
const option = {stats : true};
compiler.init(option);

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

io.on('connection', function (socket) {
  console.log("connect server");
  socket.on('compile', function(data) {
    var code = data.code;
    var envData = {
		OS: "linux",
		cmd: "gcc"};

    compiler.compileCPP(envData, code, function(result) {
      if (result.error) {
        socket.emit('compile_error', result.error);
        console.log(result.error);
	  }
      else {
        socket.emit('compile_success', result.output);
		console.log(result.output);
      }
    });
  });

  socket.on('signin', function(data) {

	console.log("hi");
	var id = data.id;
	var pw = data.pw;
	console.log(id);
	console.log(pw);
	var query = "SELECT * FROM user_info WHERE `user_id`=?";
	var params = id;

//	db.connect();

	db.query(query, params, function(err, result, fields) {
		if (err) {
			console.log(err);
			socket.emit('check_signin', "username does not exist");
		}

		else {
			if(pw == result[0].user_pw) {
				socket.emit('check_signin', "success");
			}
			else {
				socket.emit('check_signin', "invalid password");
			}
//			console.log(result[0].user_pw);
		}
	});

//	db.end();
  });

  socket.on('signup', function(data) {
	
	var id = data.id;
	var pw = data.pw;
	
	var query = "INSERT INTO user_info VALUES(?,?);";
	var params = [id, pw];
//	db.connect();

	db.query(query, params, function(err, result, fields) {
		if (!err) {
			socket.emit('check_signup', "success");
		}
		else {
			socket.emit('check_signup', "faile");
			console.log("mysql error");
			console.log(err);
		}
	});

//	db.end();

  });

  socket.on('forceDisconnect', function() {
    socket.disconnect();
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is runnint at http://localhost:${port}`);
});
