//My Bot
var Bot = require("./index");

var AUTH   = 'BubUFZiLBRCpkFrVMVXFCcxy';
var USERID = '5057de39aaa5cd46210000be';
var ROOMID = '4e278f3414169c7c218d136c';

var bot = new Bot(AUTH, USERID, ROOMID);

var roomObj = new Object();

var authInfo = {
	masterid: "4ffc9d11eb35c124cb00001d",
	selfid: USERID
}

bot.on('speak', function (data) {
   // Get the data
   var name = data.name;
   var text = data.text;
   var userid = data.userid;
	
   // Respond to "/nod" command
   if (text.match(/^\/nod$/) || text.match(/^\/dontberude$/) || text.match(/^\/don\'tberude$/)) {
		bot.vote("up");
	}
	// Respond to "/boo" command
	if (text.match(/^\/boo$/)) {
		bot.vote("down");
	}
	// Add a song to the queue
	if (text.match(/^\/addthis$/)) {
		
		if (userid == authInfo["masterid"]) {
			if (typeof(roomObj["songid"]) != "undefined") {
				bot.snag(function() {
					bot.playlistAdd(roomObj["songid"], function() {
						bot.vote("up");
						bot.speak("Mmmm.. luv me sum tunez");
					});
				});
				
			}
			else {
				bot.speak("Aww.. shucks. Can't get the song info");
			}
		}
		else {
			bot.speak("Sorry @" + name + ", that is a restricted command.");
		}
	}
});

bot.on("pmmed", function(data) {
	var text = data.text;
	console.log(text);
	if (data.senderid == authInfo["masterid"] || data.senderid == data.userid) {
		console.log(text);
		if (text.match(/nod/)) {
			bot.vote("up");
		}
		if (text.match(/addsong/) || text.match(/addthis/)) {
			if (typeof(roomObj["songid"]) != "undefined") {
				bot.snag(function() {
					bot.playlistAdd(roomObj["songid"], function() {
						bot.vote("up");
						bot.speak("Mmmm.. luv me sum tunez");
					});
				});
			}
			else {
				bot.speak("Aww.. shucks. Can't get the song info");
			}
		}
		if (text.match(/boo/)) {
			bot.vote("down");
		}
		if (text.match(/logcurrentsongobj/)) {
			for (var key in roomObj) {
				console.log(key + ": " + roomObj[key]);
			}
		}
		if (text.match(/^\/say/)) {
			console.log(text);
			var msg = text.split("/say ")[1];
			console.log(msg);
			bot.speak(msg);
		}
	}
	else {
		bot.speak("What's that? You don't have the proper badge!");
	}
	
	
});

bot.on("newsong", function(data) {
	var roomMetaData = data["room"]["metadata"];
	var songid = roomMetaData["current_song"]["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["songid"] = songid;
	roomObj["dj"] = djid;
	
});

bot.on("endsong", function(data) {
	var roomMetaData = data["room"]["metadata"];
	var songid = roomMetaData["current_song"]["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["previoussong"] = songid;
	roomObj["previousdj"] = djid;
	
});

bot.on("roomChanged", function(data) {
	var roomMetaData = data["room"]["metadata"];
	var songid = roomMetaData["current_song"]["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["songid"] = songid;
	roomObj["dj"] = djid;
});