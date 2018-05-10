var express = require('express');
var app = express();
var path = require('path');

var title = 'Awesome Conference Title!'; // Title of the talk
var liveSockets = []; // Array of live socket connections
var visitors = [];

// serving static files
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.use('/*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// starting up the server
var httpServer = app.listen(3000);

// starting socket server
var socketServer = require('socket.io').listen(httpServer);

// listenning to connection
socketServer.sockets.on('connection', function(socket) {
	// register socket disconnect listener
	socket.once('disconnect', onSocketDisconnect.bind(this, socket));

	socket.on('join', onMemberJoined);

	// Broadcasting a welcome message
	socket.emit('welcome', { title: title });

	liveSockets.push(socket);

	console.log('New Socket connection: ', socket.id);
	console.log('Total number of live connections:', liveSockets.length);
});

// process socket disconnet event
function onSocketDisconnect(socket) {
	var index = liveSockets.indexOf(socket);
	liveSockets.splice(index, 1);
	var visitorsIndex = visitors.findIndex(function(item) { return item.id === socket.id });

	if (~visitorsIndex) {
		visitors.splice(visitorsIndex, 1);
		socketServer.sockets.emit('visitors', {visitors: visitors});
	}
	socket.disconnect();

	console.log('Remaining number of live connections:', liveSockets.length);
}

function onMemberJoined(payload) {
	console.log(`A new member joined the conference: ${payload.name}`);
	var newMember = {
		id: this.id,
		name: payload.name
	}
	this.emit('joined', newMember);
	visitors.push(newMember);
	socketServer.sockets.emit('visitors', {visitors: visitors});
}

console.log('The Server is running');
