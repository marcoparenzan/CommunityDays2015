var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var path = require('path');

var app = express();

//app.use(express.cookieParser());
//app.use(express.session({ "secret": "iugvs98sev9sg8t9gu8sr9tuh9" }));
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisOptions = { auth_pass: '<redis key>' };

// http://azure.microsoft.com/en-us/documentation/articles/cache-nodejs-get-started/
var redisClient = redis.createClient(6379, 'cdays15.redis.cache.windows.net', redisOptions);
app.use(express.cookieParser('rtvuiserhisueghisvuhgius'));
app.use(express.session({ store: new RedisStore({ client: redisClient }) }));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.dataEntry1);
app.get('/dataEntry1', routes.dataEntry1);
app.post('/dataEntry1', routes.dataEntry1);
app.get('/dataEntry2', routes.dataEntry2);
app.post('/dataEntry2', routes.dataEntry2);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map
