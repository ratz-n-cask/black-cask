$(function() {
	"use strict";

	var content = $("#content");
	var input = $("#input");
	var status = $("#status");

	//Color and Name blank by default
	var myColor = false;
	var myName = false;

	//Check for native FireFox WS
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	//If the browser does not support WS at all, display message
	if (!window.WebSocket) {
		content.html($("<p>", {text: "Sorry, but your browser doesn\'t support WebSockets."}));
		input.hide();
		$("span").hide();

		return;
	}

	//This function will add messages to the chat window
	function addMessage(author, message, color, date) {
		content.append("<p><span style='color:" + color + "'>" + author + "</span> @ " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ": " + message + "</p>");
	}

	//Open WS connection at post 1337
	var connection = new WebSocket("ws://127.0.0.1:1337");

	//When the connection is opened, the text input is enabled and the status shows a message
	connection.onopen = function() {
		input.removeAttr("disabled");
		status.text("Choose name: ");
	};

	//If an error is thrown, display an error message
	connection.onerror = function(error) {
		content.html($("<p>", {text:"Sorry, but there\'s some problem with your connection or the server is down.</p>"}))
	};

	//If a message is received
	connection.onmessage = function(message) {
		//Check for valid JSON
		try {
			var json = JSON.parse(message.data);
		}
		catch(e) {
			console.log("This doesn\'t look like a valid JSON: ", message.data);

			return;
		}

		//Check for color
		if (json.type == "color") {
			myColor = json.data;
			
			//Display the user's name in the color received from the message
			status.text(myName + ": ").css("color", myColor);

			//Focus the input field
			input.removeAttr("disabled").focus();
		}
		else if (json.type == "history") {
			
			//Add chat history to the room
			for (var i = 0; i < json.data.length; i++) {
				addMessage(json.data[i].author, json.data[i].text, json.data[i].color, new Date(json.data[i].time));
			}
		}
		else if (json.type == "message") {
			
			//Add new message to the chat
			input.removeAttr("disabled");
			addMessage(json.data.author, json.data.text, json.data.color, new Date(json.data.time));
		}
		else {
			console.log("Hmm..., I\'ve never seen JSON like this: ", json);
		}
	};

	input.keydown(function(event) {
		
		//Send messages with the Enter key
		if (event.keyCode == 13) {
			var msg = $(this).val();
			if (!msg) {
				return;
			}
			connection.send(msg);
			$(this).val("");
			
			//Disable the input field until the server sends back a response
			input.attr("disabled", "disabled");

			//The first message is the user's name
			if (myName == false) {
				myName = msg;
			}
		}
	});

	//Check for a connection every 3 seconds
	setInterval(function() {
		if (connection.readyState != 1) {
			status.text("Error");
			input.attr("disabled", "disabled").val("Unable to communicate with WS Server");
		}
	}, 3000);

	
})