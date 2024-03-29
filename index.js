'use strict';

/**
 * Module dependencies.
 */
var _package = require('./package.json'),
express = require('express'),
fs = require('fs'),
jade = require('jade'),
mongoose = require('mongoose'),
 _ = require('underscore'),
nconf = require('nconf'), 
http = require('http'),  
// program = require('commander'),
chalk = require('chalk'),
passport = require('passport'),
//logger = require('mean-logger'),
 mongoStore = require('connect-mongo')(express),
flash = require('connect-flash'),
helpers = require('view-helpers');

var locale = require("locale")
  , supported = ["fr-fr"]

// could check file existence for github forkers :)
nconf.argv().env().file({file:'config.json'});

var auth = require('./api/authorization');
var db = mongoose.connection;
var dbz = mongoose.connect('mongodb://localhost/'+nconf.get('DB_NAME'));

var player_;
// models auto load
var models_path = __dirname + '/api/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log(chalk.green('Hello mongo') );
});
var app = express();

    //Prettify HTML
    // app.locals.pretty = true;

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

   app.enable("jsonp callback");


app.configure(function(){
  app.set('port',nconf.get('PORT') );
 
 
 app.set('views', __dirname + '/views');
 // alter mode app.set('views', __dirname + '/templates');
 


  app.set('view engine', 'jade');
  app.set('view options', {
    layout: true,
    debug: true,
    pretty: true
  });
    app.use(express.cookieParser( nconf.get('COOKIESECRET')) );

        app.use(express.bodyParser());
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride( nconf.get('SESSIONSECRET') ));
  
        //express/mongo session storage
        app.use(express.session({
            secret: nconf.get('SESSIONSECRET'),
            store: new mongoStore({
                db: mongoose.connection.db,
                collection: 'sessions',
                clear_interval: 3600,
                auto_reconnect: true
            })
        }));

        //connect flash for flash messages
        app.use(flash());
        
         app.use(locale(supported))
        //i18n (server)
      //  app.use(locale(supported))
        // lang_js_url : 
        

        // thx @ http://stackoverflow.com/questions/5276892/expressjs-how-to-output-pretty-html
        app.locals.pretty = true;
        
        app.locals.site_title = nconf.get('SITE_TITLE');
        app.locals.site_description = nconf.get('SITE_DESCRIPTION');
        app.locals.site_description_long = nconf.get('SITE_DESCRIPTION_LONG');
        app.locals.env = nconf.get('ENV');
        app.locals.root_url= nconf.get('ROOT_URL');
        app.locals.fbapp_id = nconf.get('FACEBOOK_ID');
        app.locals.port= nconf.get('PORT')


       
        app.locals.socket_server_port= nconf.get('SOCKET_SERVER_PORT')
       
        // contruct STRING
        app.locals.api_url= nconf.get('ROOT_URL')+':'+nconf.get('PORT')+'/'+nconf.get('API_SUFFIX_URL');

      
        // > if setted to "null" script wont be load in view
        app.locals.socket_url = nconf.get('SOCKET_SERVER_URL')
        // i18n dyn. load
        
        app.use(function(req, res, next){
         res.locals.lang_js_url = '/js/angular-modules/i18n/angular_fr-fr.js';

         next();
        });

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
       // app.use(app.router);
        
        //Setting the fav icon and static folder
        app.use(express.favicon());



        app.use(express.static(__dirname + '/public'));
        app.use(app.router);
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: false , showStack: false }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*:");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
require('./api/passport')(passport);
// Routes
var routes = require('./api/routes')(app, passport, auth);
var server =  http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(chalk.green( "Express server listening on port "+ app.get('port')  ) );
});

var io =  require('socket.io').listen(server, {log:true, origins:'*:*'}, function(){
  console.log(chalk.green('Hello io') );
})

//if(!players_){
        console.log('fresh') 

        var players_ = []
        var player_bus = {'server_target': 'abribus1','lat':'48.8819132031', 'long': '2.3260', 
        'videos': [
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/FKz2UvuY6YY', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/B3eAMGXFw1o', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/ZTidn2dBYbY', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/T4LVXCCmIKA', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/UNpOeGIrNeQ', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/KHZ8ek-6ccc', 'time':'3.02', 'description': 'blou bla bla'},
            {'provider': 'youtube', 'url': 'https://www.youtube.com/embed/5YLabmf5pu0', 'time':'3.02', 'description': 'blou bla bla'},
           





            ] } 
        players_.push(player_bus)
        console.log(players_)
 //   }


io.on('connection', function (socket) {
      console.log(chalk.green('Hello io') );

        socket.on('ping', function(data){
     require('./api/socket').socketer(socket, data, players_);
  });
    
    socket.on('push', function(data){
        _.each(players_, function(player,i){
                 
                    players_[i].videos.push(data)
                    socket.emit('pong', players_[i]);
                    socket.broadcast.emit('pong',players_[i]);
                    return players_;
                
            })
  });

});
// logger.init(app, passport, mongoose);
//expose app
/*
exports.stat = function(){
    console.log('internal sockets says:')
    return 'ui';
};
*/

 // test function for internal use
exports = module.exports = app;


