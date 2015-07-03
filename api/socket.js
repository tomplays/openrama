var io;
var socket;
var says;

var chalk = require('chalk'),
 _ = require('underscore');


exports.socketer = function(socket, data){


	var players_ = []


	var player_bus = {'lat':'48.8818496', 'long': '2.326056' }

players_.push(player_bus)
console.log(players_)


	_.each(players_, function(player){

			var delta_lat = Math.pow(player.lat - data.lat, 2)
			var delta_long = Math.pow(player.long - data.long,2)

			var diff = Math.sqrt(delta_long+delta_lat)
			console.log('delta_lat'+delta_lat) 
			console.log('delta_lat'+delta_long) 
			console.log('diff'+diff)



			if(diff<0.000009174311926605506){
				console.log('1 metre far')
			}
			else{
				console.log('else')
			}





	})


	console.log('socket data')
	console.log(data)
	console.log(chalk.green('got ping'))

     socket.emit('pong', {'letter': 'ds'});
     socket.broadcast.emit('pong', {'letter': 'ds'});

	//socket.emit('newsback', data)
	//socket.broadcast.to('homepage').emit('newsback', data)
	//io.sockets.in(room).emit('message', data);
	//socket.broadcast.emit('newsback', data)
}
