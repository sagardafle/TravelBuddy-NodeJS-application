
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', user.list);
app.get('/login', routes.login);

console.log(__dirname)

app.post('/login', function(req, res) {
    var user_id = req.body.userSelection;
    var emailaddress = req.body.username;
    
    console.log("body.........................",req.body.name);
    res.redirect('/home/?emailaddress='+emailaddress);

    
});

app.post('/getUser', user.getUser);

app.get('/home', routes.home);

app.get('/maps', routes.maps);

app.post('/userLogin', user.userLogin);

app.post('/updateUser', user.updateUser);

app.post('/userInterest', user.userInterest);

app.post('/getUserInterest', user.getUserInterest);

app.post('/userersWithSameInterest', user.userersWithSameInterest);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
