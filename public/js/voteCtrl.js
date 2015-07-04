
var inheriting = {};
var GLOBALS;
var _;
angular.module('lobbycitoyen.document_controller', []);

function PlayerCtrl($scope, $http , $timeout, $window, $sce, $location, $routeParams, $locale,$timeout, VoteRest, vendorService,localStorageService) {





$scope.save = function(v){

   //
  
   

   var g = localStorageService.get('videosz');

  
   if(g){
   		v.saved = true
   	 g.push(v)
   	  console.log(g)
   	 localStorageService.set('videosz', g);

   }else{
   	 var f = []
  	localStorageService.set('videosz', f);
   }


  


}

	$scope.playpause = function(v){
		_.each($scope.playing.videos, function(vi,i){
vi.playing=false;
				if(v==vi){
				
					$scope.playing.videos = _.without($scope.playing.videos, vi)
				
					$scope.playing.videos.push(vi)
				}


				if(i==0){
						vi.playing=true;
				}


		})
		$scope.playing.videos[0].playing=true

$scope.$digest();
		//v.playing==true


	}
	
	var socket = io.connect();
		  	//	$scope.saved = localStorageService.get('videosz');

		$scope.playlist = []
		//$scope.playing = {'provider': null, 'url': false, 'from': null}
	$scope.ui = {}
	$scope.ui.ready =true;
	$scope.ui.lauched =false;


	$timeout(function(){
			$scope.ui.lauched= false

	},3000)

$scope.next = function (){


	
_.each($scope.playing.videos, function(vi,i){
vi.playing=false;
				if(i==0){
					vi.url = vi.url.replace('?autoplay=1&loop=1', '')
					$scope.playing.videos = _.without($scope.playing.videos, vi)
					$scope.playing.videos.push(vi)
				}


				


		})
		$scope.playing.videos[0].playing=true
		$scope.playing.videos[0].url +='?autoplay=1&loop=1' 


$scope.$digest();
		}

	socket.on('pong', function(data){
	  
 		
		
	  	if(data.server_target == $routeParams.id){
	  		//&& $scope.ui.lauched == false
	  		
	  		console.log(data)

	  		$scope.playing = data
	  		//$scope.playing.videos.reverse(); 


	  		_.each($scope.playing.videos, function(v,i){
	  			v.playing==false

	  			if(i==0){
	  				v.playing=true
	  				v.url +='?autoplay=1&loop=1' 
	  			}
	  			

	  		})
			$scope.notice = true

	  		$timeout(function(){

				$scope.notice = false
	  		},3000)
	  		

	  		//$scope.playing.videos.push($scope.saved)
	  		$scope.$digest();
	  	}
	   
	  });



	


}
function HomeCtrl($scope, $http ,$window, $sce, $location, $routeParams, $locale,$timeout, VoteRest, vendorService,localStorageService) {
		$scope.ui = {}
		$scope.playlist = []
		$scope.playing = {'provider': null, 'url': false, 'from': null}

		$scope.ui.sockets_refresh =false
		$scope.render_config = new Object()
      	$scope.render_config.i18n =  $locale;
      	$scope.i18n                       = $locale;
  		var socket = io.connect();






  		$scope.submit = { 'url_1': 'https://www.youtube.com/embed/AuX-KorBIZg ', 'url_2': 'https://www.youtube.com/embed/Lwb-GEiykRo', 'url_3': 'https://www.youtube.com/embed/Of2HU3LGdbo'}

      	$scope.addtoqueue = function(val){


      		var s = {'provider': 'youtube'}
      		if(val == 1){
      			s.url = $scope.submit.url_1
      		}
      		if(val == 2){
      			s.url = $scope.submit.url_2
      		}
      		if(val == 3){
      			s.url = $scope.submit.url_3
      		}

      		$scope.ajoute = 'video ajouté à la playlist'
      		s.server_target = $scope.server_target


      		console.log(s)
			socket.emit('push', s)
				

      	}


 


	 
	  socket.on('pong', function(data){
	  	console.log(data)
	  	$scope.server_target = data.server_target
	  	$scope.distance = data.distance

	  	$scope.$digest();

	   
	  });


	
	
		          $scope.ui.sockets_refresh = true
		          $scope.ui.ready =true;
		         $scope.once = true



		          if(navigator.geolocation){
				   	navigator.geolocation.watchPosition(function(position){
				   		$scope.position = position
						$scope.clientlat = position.coords.latitude;
				  		$scope.clientlon = position.coords.longitude;
				  		
						var p = {'lat':position.coords.latitude, 'long': position.coords.longitude }
						


		          if($scope.once  == true){
$scope.once = false
		          	socket.emit('ping', p)
					$scope.$digest();
		          }

					
	  	
					




				   });
				  } else {
				   $scope.ui.ready =true;
				   alert("Your browser or device doesn't support Geolocation");
				  }
							
		
}

function VoteCtrl($scope, $http , $sce, $location, $routeParams, $locale, $timeout, VoteRest, vendorService, socket) {
		
		
} 

angular.module('lobbycitoyen.voteRest', [])
.factory("VoteRest", function($resource, $rootScope){

  var parseResponse = function (data) {
    var data_ = angular.fromJson(data);
    return data_
  };

  return $resource(
    {Id:'@id'},
    {},
    {
      get:{
        method:"GET",
        url: api_url+'/vote/:Id/',
        //transformResponse: parseResponse
        //interceptor: { response: parseResponse }
        //isArray: false
      },
      new_vote:{
        method:"POST",
        url: root_url+':'+PORT+'/voteinit'
        //transformResponse: parseResponse
        //interceptor: { response: parseResponse }
        //isArray: false
      },
      vote_delete:{
        method:"POST",
        url: api_url+'/vote/:Id/delete',
         params :  {Id:'@id'},
        //transformResponse: parseResponse
        //interceptor: { response: parseResponse }
        //isArray: false
      },
      account:{
        method:"GET",
        url: api_url+'/me/account',
        //transformResponse: parseResponse
        //interceptor: { response: parseResponse }
        //isArray: false
      },
      vote_edit:{     
        method:"POST",
        url: api_url+'/vote/:Id/edit',  
         params :  {Id:'@id'},
      },
      votes_home:{     
        method:"GET",
        url: api_url+'/votes/',  
      },
      doc_new :{       
        method:"POST",
        url: api_url+'/doc/create',
      }
    }
  );
})


angular.module('lobbycitoyen.vendorService', [])

.service('vendorService', ['$q', '$timeout', '$window', function($q, $timeout, $window){
    var deferred = $q.defer(), libs = {};
    
    $script([
        'js/libs/jquery-1.5.1.min.js',
       // 'js/raphael-min.js',
        'bower_components/momentjs/moment.js',
		'bower_components/underscore/underscore-min.js'
       // 'js/raphael.tooltip.js',
       // 'js/hemi.js'
    ], 'vendorBundle');

    $script.ready('vendorBundle', function() {
        libs.$ = $window.jQuery.noConflict();
        libs._ = $window._.noConflict();
        $timeout(function(){
            deferred.resolve(libs);
         
        }, 0);
    });
    this.getLibs = function(){
        return deferred.promise;
    }
}])




angular.module('lobbycitoyen.Socket', [])
.factory('socket', function($rootScope, $http, $location)  {
  //  app.locals.port=
  if(SOCKET_URL !==""){
       console.log('loading sockets')
       var socket = io.connect(SOCKET_URL+':'+SOCKET_SERVER_PORT);
  
    return {
      start: function(){
       //console.log(socket)
      },
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
         $rootScope.$apply(function () {
            
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              //alert('on')
              callback.apply(socket, args);
            }
          });
        })
      }
    };

  }
  else {
     console.log('not loading sockets')
    var socket = '';
    return {
      on:  function () {},
      emit:  function () {}

    }
    
  };
});
