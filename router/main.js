module.exports = function(app)
{
  app.get('/', function(req,res) {
    res.render('index.html');
  });
  app.get('/about', function(req,res) {
    res.render('about.html');
  });
  app.get('/signup', function(req, res) {
	res.render('signup.html');
  });
  app.get('/main', function(req, res) {
	res.render('main.html');
  });
}
