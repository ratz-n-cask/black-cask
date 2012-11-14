//var repl = require("repl");
var repl = require("repl");
//My Bot
var Bot = require("./index");
var BotContainer = require("./botcontainer").BotContainer;

var AUTH   = 'BubUFZiLBRCpkFrVMVXFCcxy';
var USERID = '5057de39aaa5cd46210000be';
var ROOMID = '4e278f3414169c7c218d136c';

var bot = new Bot(AUTH, USERID, ROOMID);
var botContainer = new BotContainer(bot);
var myBot = botContainer.basicbot;
var botInfo = botContainer.botinfo;

var roomObj = new Object();

var authInfo = {
	masterid: botInfo.MASTERID,
	selfid: botInfo.USERID
}
repl.start("> ").context.mybot = myBot;
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

	//Skip the bot's current song
	if (text.match(/^\/skipthis$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.skipsong();
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}

	//Get Song Info
	if (text.match(/^\/song$/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getsonginfo(false);
		}
		else {
			myBot.sendmsg("Sorry @" + name + ", that is a restricted command.");
		}
	}

	//About
	if (text.match(/^\/about$/)) {
		myBot.sendmsg("Prometheus by @dopatraman");
	}

	//DirectMessage
	if (text.match(/^@.prometheus$/)) {
		console.log(text);
	}
});

myBot.bot.on("pmmed", function(data) {
	var name = data.name;
	var text = data.text;
	var userid = data.senderid;

	/********************Private Commands***************************/
	
	console.log(text);

	if (text.match(/nod/)) {
		if (userid == authInfo["masterid"]) {
			myBot.voteup();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
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
				myBot.whisper("Aww.. shucks. Can't get the song info", userid);
			}
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/boo/)) {
		if (userid == authInfo["masterid"]) {
			myBot.votedown();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/^\/say/)) {
		if (userid == authInfo["masterid"]) {
			myBot.couriermsg(text);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/addroom/)) {
		if (userid == authInfo["masterid"]) {
			myBot.addfavoriteroom();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/addfan/)) {
		if (userid == authInfo["masterid"]) {
		var fanName = text.split("addfan ")[1];
			myBot.addfan(fanName);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/hopon/)) {
		if (userid == authInfo["masterid"]) {
			myBot.becomedj();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}

	if (text.match(/hopoff/)) {
		if (userid == authInfo["masterid"]) {
			myBot.enddj();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/^goforthto/)) {
		if (userid == authInfo["masterid"]) {
			myBot.sendtoroom_raw(text, "goforthto ");
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
	if (text.match(/skipthis/)) {
		if (userid == authInfo["masterid"]) {
			myBot.skipsong();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}

	if (text.match(/^getroominfo/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getroominfo_raw(text, "getroominfo ", false);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/^getusers/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getroomusers(false);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/^getuserinfo/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getuserinfo_raw(text, "getuserinfo ", false);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/^songinfo/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getsonginfo(true);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/^getfavoriterooms/)) {
		if (userid == authInfo["masterid"]) {
			myBot.getfavoriterooms();
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	if (text.match(/^whisper/)) {
		if (userid == authInfo["masterid"]) {
			var rawstring = text.split("whisper ")[1];
			var msgarray = rawstring.split(" msg:");
			var username = msgarray[0];
			var msg = msgarray[1];
			myBot.makewhisper(username, msg);
		}
		else {
			myBot.whisper("What's that? You don't have the proper badge!", userid);
		}
	}
	
});

myBot.bot.on("newsong", function(data) {
	var roomData = data["room"];
	var roomMetaData = roomData["metadata"];
	var songdata = roomMetaData["current_song"];
	var songid = songdata["_id"];
	var songname = songdata.metadata.song;
	var songartist = songdata.metadata.artist;
	var djid = roomMetaData["current_dj"];
	
	roomObj["alldata"] = roomData;
	
	roomObj["songdata"] = songdata;
	roomObj["songid"] = songid;
	roomObj["dj"] = djid;

	myBot.cl.logmessage(songname + " by " + songartist + " has just started.\n")
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
	var roomData;
	if (data) {
		roomData = data.room;
		roomObj["alldata"] = data.room;	

		myBot.cl.logmessage("Room " + roomData["name_lower"] + " entered \n");
	}

	var roomMetaData;
	if (roomData) {
		roomMetaData = roomData.metadata;
	}
	var songData;
	if (roomMetaData) {
		songData = roomMetaData.current_song;
		roomObj["songdata"] = songData;
		roomObj["dj"] = roomMetaData.current_dj;
	}
	var songId;
	if (songData) {
		songId = songData._id;
		roomObj["songid"] = songId;

		var songMetaData = songData.metadata;
		var songName = songMetaData.song;
		var songArtist = songMetaData.artist;

		myBot.cl.logmessage(songName + " by " + songArtist + " is currently playing.\n");
	}
	
});

myBot.bot.on("update_votes", function(data) {
	var roomData = data["room"];
	var roomMetaData = roomData["metadata"];
	//console.log("roomdata: " + data.room);
	//myBot.recordvotes(roomMetaData);
});

myBot.cl.yellow("bot launched.");
