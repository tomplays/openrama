var io;
var socket;
var says;

	
var chalk = require('chalk'),
 _ = require('underscore');

exports.pusher = function(socket, data, players_){
			console.log('pusher') 
			console.log(players_) 
			
			//data.description = "tro b1 7 vidéo"
			_.each(players_, function(player,i){
				
					players_[i].videos.push(data)
					socket.emit('pong', player);
     				socket.broadcast.emit('pong', player);
					return players_;
				
			})
			

}

exports.socketer = function(socket, data, players_){


	
			console.log('already set fresh') 


	_.each(players_, function(player){

			var delta_lat = Math.pow(player.lat - data.lat, 2)
			var delta_long = Math.pow(player.long - data.long, 2)

			var diff = Math.sqrt(delta_long + delta_lat)
			
			console.log('delta_lat'+delta_lat) 
			console.log('delta_lat'+delta_long) 
			
			console.log('diff'+diff)
			if(diff<0.00006270591957237519){
				console.log('1 metre far')
			}
			else{
				console.log('else')
			}
			player.distance = diff*100000
	 		socket.emit('pong', player);
     		socket.broadcast.emit('pong', player);
	})
}
