//My Bot
var Bot = require("./index");
var BasicBot = require("./BasicBot");

var AUTH   = 'BubUFZiLBRCpkFrVMVXFCcxy';
var USERID = '5057de39aaa5cd46210000be';
var ROOMID = '4e278f3414169c7c218d136c';

var bot = new Bot(AUTH, USERID, ROOMID);
var myBot = new BasicBot.start(bot);

var roomObj = new Object();

var authInfo = {
	masterid: "4ffc9d11eb35c124cb00001d",
	selfid: USERID
}
myBot.bot.on("speak", function(data) {
	var name = data.name;
	var text = data.text;
	var userid = data.userid;
	
	//Vote Up
   if (text.match(/^\/nod$/) || text.match(/^\/dontberude$/) || text.match(/^\/don\'tberude$/)) {
		myBot.voteup();
	}
	
	//Vote Down
	if (text.match(/^\/boo$/)) {
		myBot.vote("down");
	}
	
	/********************Private Commands***************************/
	
	//Add a song to the queue
	if (text.match(/^\/addthis$/)) {
		if (userid == authInfo["masterid"]) {
			if (typeof(roomObj["songdata"]) != "undefined") {
				myBot.addsong(roomObj["songdata"]);
			}
			else {
				myBot.sendmsg("Aww.. shucks. Can't get the song info");
			}
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Add a favorite room
	if (text.match(/^\/addroom$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.addfavoriteroom();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Add a fan
	if (text.match(/^\/addfan/)) {
		if (userid == authInfo["masterid"]) {
			var fanName = text.split("/addfan ")[1];
			myBot.addfan(fanName);
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Change the bot's avatar
	if (text.match(/^\/changeavatar/)) {
		if (userid == authInfo["masterid"]) {
			myBot.setavatar();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Become a DJ
	if (text.match(/^\/hopon$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.becomedj();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Exit the DJ Booth
	if (text.match(/^\/hopoff$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.enddj();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Enter the room of the bot's user
	if (text.match(/^\/comehither$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.summon(userid);
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
	
	//Skip the bot's current song
	if (text.match(/^\/skipthis$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.skip();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}
});

myBot.bot.on("pmmed", function(data) {
	var text = data.text;
	var userid = data.senderid;
	
	/********************Private Commands***************************/
	
	
	if (text.match(/nod/)) {
		if (userid == authInfo["masterid"]) {
			myBot.voteup();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	if (text.match(/addsong/) || text.match(/addthis/)) {
		if (userid == authInfo["masterid"]) {
			if (typeof(roomObj["songid"]) != "undefined") {
				if (typeof(roomObj["songdata"]) != "undefined") {
					myBot.addsong(roomObj["songdata"]);
				}
			}
			else {
				myBot.sendmsg("Aww.. shucks. Can't get the song info");
			}
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	if (text.match(/boo/)) {
		if (userid == authInfo["masterid"]) {
			myBot.votedown();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/^\/say/)) {
		if (userid == authInfo["masterid"]) {
			myBot.couriermsg(text);
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/addroom/)) {
		if (userid == authInfo["masterid"]) {
			myBot.addfavoriteroom();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/addfan/)) {
		if (userid == authInfo["masterid"]) {
		var fanName = text.split("addfan ")[1];
			myBot.addfan(fanName);
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/changeavatar/)) {
		if (userid == authInfo["masterid"]) {
			myBot.setavatar();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/hopon/)) {
		if (userid == authInfo["masterid"]) {
			myBot.becomedj();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}

	if (text.match(/hopoff/)) {
		if (userid == authInfo["masterid"]) {
			myBot.enddj();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/comehither/)) {
		if (userid == authInfo["masterid"]) {
			myBot.summon(userid);
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}
	
	if (text.match(/skipthis/)) {
		if (userid == authInfo["masterid"]) {
			myBot.skip();
		}
		else {
			myBot.sendmsg("What's that? You don't have the proper badge!");
		}
	}

});

myBot.bot.on("newsong", function(data) {
	var roomData = data["room"];
	var roomMetaData = roomData["metadata"];
	var songdata = roomMetaData["current_song"];
	var songid = songdata["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["alldata"] = roomData;
	
	roomObj["songdata"] = songdata;
	roomObj["songid"] = songid;
	roomObj["dj"] = djid;
});

myBot.bot.on("endsong", function(data) {
	var roomData = data["room"];
	var roomMetaData = roomData["metadata"];
	var songdata = roomMetaData["current_song"];
	var songid = songdata["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["previoussong"] = songid;
	roomObj["previousdj"] = djid;
	
	myBot.logvotes(roomMetaData);
	
});

myBot.bot.on("roomChanged", function(data) {
	var roomData = data["room"];
	var roomMetaData = roomData["metadata"];
	var songdata = roomMetaData["current_song"];
	var songid = songdata["_id"];
	var djid = roomMetaData["current_dj"];
	
	roomObj["alldata"] = roomData;
	
	roomObj["songdata"] = songdata;
	roomObj["songid"] = songid;
	roomObj["dj"] = djid;
	
	console.log("Room " + data["room"]["name_lower"] + " entered");
	
	roomObj["userlist"] = new Object();
	var users = data.users;
    for (var i=0; i<users.length; i++) {
      var user = users[i];
      roomObj["userlist"][user.userid] = user;
    }
});

myBot.bot.on("update_votes", function(data) {
	var votedata = data.room.metadata;
	myBot.recordvotes(votedata);
});

console.log("bot launched.");