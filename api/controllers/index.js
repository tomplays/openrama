'use strict';

/**
* @description
* @function 
* @link 
* @todo nothing
*/


var nconf = require('nconf');
nconf.argv().env().file({file:'config.json'});



  /**
  * @description
  * @function 
  * @link 
  * @todo nothing
  */

  exports.partial = function (req, res) {
    var name = req.params.name;
    if(req.params.sub){
      var sub = req.params.sub+'/';
    }
    else{
       var sub = '';
    }
    

    var extraparam = '';

    if(req.params.param){ var extraparam = req.params.param; }
    res.render('partials/'+sub+name , {
      locals: {
               title: name,
               extraparam: extraparam
      }
    });
  };


  /**
  * @description
  * @function 
  * @link 
  * @todo nothing
  */

  exports.fragments = function (req, res) {
    var name = req.params.name
    var extraparam = ''
    if(req.params.param){ 
      var extraparam = req.params.param
    }
    res.render('fragments/' + name , {
      locals: {
               title: name,
               extraparam: extraparam
      }
    })
  }


  /**
  * @description
  * @function 
  * @link 
  * @todo nothing
  */

  exports.errors = function(req, res) {
    var message = '<a style="text-decoration:underline;" href="'+nconf.get('ROOT_URL')+':'+nconf.get('PORT')+'"> &laquo; Back </a>';
    res.render('error', { title: 'Nothing here', message: message} );
  };

  
exports.home= function(req, res) {
      var user_ = {};

       if(req.user){
        user_ = req.user.toObject()
  
      }
    
      res.render('vote', {
        user_in : user_,
        doc_title : 'Accueil',
        raw_content : '',
        doc_thumbnail : '',
        doc_excerpt: '',
        doc_slug_discret : '',
        doc_include_js : '',
        doc_include_css : '' 
      });     
    
    
  }

  /**
  * @description
  * @function 
  * @link 
  * @todo nothing
  */
  exports.single= function(req, res) {
res.render('vote', {
            user_in : 'user_',
            doc_title : 'doc.title',
            raw_content : 'doc.content',
            doc_thumbnail : 'doc.thumbnail',
            doc_excerpt: 'doc.excerpt',
            doc_slug_discret : 'doc_slug_discret',
            doc_include_js : 'doc_include_js',
            doc_include_css : 'doc_include_css' 
          });
  }


