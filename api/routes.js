'use strict';



// require all controllers

var index   = require('../api/controllers/index');


module.exports = function(app, passport, auth) {
    
    app.get('/',                            index.home);
    app.get('/server/:id',                    index.single);
    app.get('/partials/:sub?/:name/:param?', index.partial); // document, lists, etc..
    app.get('/fragments/:name/:param?',     index.fragments); // load sub-blocks 
    app.get('/doc/fragments/:name/:param?', index.fragments); // load sub-blocks ? express/angualar..?
};