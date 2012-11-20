"use strict";

process.title = "node-chat";
var webSocketServerPort = 1337;
var WebSocketServer = require("websocket").server;
var http = require("http");

var history = [];
var clients = [];

//Get rid of problematic characters
function htmlEntities(str) {
	return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var colors = ["red","green","blue","magenta","purple","plum","orange"];
colors.sort(function(a,b) {return Math.random() > 0.5});

var server = http.createServer(function(request, response) {

});
server.listen(webSocketServerPort, function() {
	console.log(new Date() + ": Server is listening on port " + webSocketServerPort);
});

var wsS = new WebSocketServer({
	//We must tie the WS server to HTTP, because a WS request is just an advanced HTTP request.
	httpServer: server
});
wsS.on("request", function(request) {
	console.log((new Date()) + " Connection from origin " + request.origin + ".");

	//Accept the connection
	var connection = request.accept(null, request.origin);

	//We need to record the connection index so we can close it
	var index = clients.push(connection) - 1;
	console.log((new Date()) + " Connection accepted.");

	var userName = false;
	var userColor = false;

	//First send the chat history, if there is one
	if (history.length > 0) {
		connection.sendUTF(JSON.stringify({type:"history", data:history}));
	}

	//If a user sends a message, listen for the "message" event
	connection.on("message", function(message) {
		if (message.type == "utf8") { //This is to filter only text content
			if (userName == false) {  //The first message sent is the user name, so capture it
				//Filter characters out of the name
				userName = htmlEntities(message.utf8Data); 
				
				//Assign random color
				userColor = colors.shift(); 
				
				//Serialize the user data and sent it in UTF format
				connection.sendUTF(JSON.stringify({type:"color",data:"userColor"}));
				
				//Log to console
				console.log((new Date()) + " User is known as: " + userName + " with " + userColor + " color.");
			}
			else {
				//This message is not the name. Log it directly to the console
				console.log((new Date()) + " Received Message from \n" + userName + ": " + message.utf8Data);

				//Record the time, content, and user info of the message
				var obj = {
					time: (new Date()).getTime(),
					text: htmlEntities(message.utf8Data),
					author: userName,
					color: userColor
				};

				//Save the history object
				history.push(obj);
				history = history.slice(-100);

				//Broadcast the message for all clients
				var json = JSON.stringify({type:"message", data:obj});
				for (var i = 0; i < clients.length; i++) {
					clients[i].sendUTF(json);
				}
			}
		}
	});
	
	//If a user ends connection, listen for the close event
	connection.on("close", function(connection) {
		if (userName != false && userColor != false) {
			//Log to console
			console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");

			//Remove user from the list of connected clients
			clients.splice(index, 1);

			//Recycle the user's color
			colors.push(userColor);
		}
	});


});