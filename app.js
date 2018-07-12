const express =require('express');
const app = express();
const server = require('http').createServer(app);
const router = require('./router/main')(app);
const io = require('socket.io')(server);

const hostname = '117.16.44.70';
const port = 3000;

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


server.listen(port, hostname, () => {
  console.log(`Server is runnint at http://${hostname}:${port}`);
})
