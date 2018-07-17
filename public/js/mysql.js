var mysql = require('myslq');
var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'paper_root',
	database	: 'paper'
});

connection.connect();

connection.query('SELECT * FORM paper', function(error, results,fields){
	if(error){
		console.log(error);
	}

	console.log(results);
});

connection.end();
