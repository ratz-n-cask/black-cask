function start(bot) {
	this.bot = bot;
	
	this.id = this.bot.userId;
	this.roomid = this.bot.roomId;
	
	this.sayings = new Array();
	this.rooms = new Array();
	this.playlists = new Object();
	
	this.avatarcount = 0;
	
	this.votelog = {
		up: 0,
		down: 0,
		listeners: 0,
		details: new Array()
	}
	
	this.addroom = function(roomid) {
		this.rooms.push(roomid);
	}
	this.addplaylist = function(playlistname) {
		this.playlists[playlistname] = new Array();
	}
	
	this.addsaying = function(phrase) {
		this.sayings.push(phrase);
	}
	this.addsayings = function(phrases) {
		for (var i = 0; i < phrases.length; i++) {
			this.addsaying(phrase[i]);
		}
	}
	
	this.sendmsg = function(msg, user) {
		if (typeof(user) != "undefined") {
			this.bot.speak("@" + user + " " + msg);
		}
		else {
			this.bot.speak(msg);
		}
	}
	
	this.couriermsg = function(text) {
		console.log(text);
		var msg = text.split("/say ")[1];
		
		this.sendmsg(msg);
	}
	
	this.vote = function(direction, cb) {
		this.bot.vote(direction, cb);
	}
	this.voteup = function(cb) {
		this.vote("up", cb);
	}
	this.votedown = function(cb) {
		this.vote("down", cb);
	}
	
	this.logvotes = function(metadata) {
		var votedata = metadata.votelog;
		
		console.log("votedata: " + votedata);
		
		this.recordvotes(votedata);
		
		console.log("myvotelog: " + this.votelog);
		
		if (this.votelog["for"] > 0.8) {
			var songid = metadata.current_song._id;
			var songname = metadata.current_song.metadata.song;
			this.addsong(songid);
			
			console.log(songname + " has been added by popular demand.");
		}
	}
	
	this.recordvotes = function(votedata) {
		
		console.log(votedata);
		
		var uptotal = votedata.upvotes - this.votelog.up;
		var downtotal = votedata.downvotes - this.votelog.down;
		var listeners = votedata.listeners;
		var percentageinfavor = uptotal/listeners;
		var percentageagainst = downtotal/listeners;
		
		this.votelog["up"] = uptotal;
		this.votelog["down"] = downtotal;
		this.votelog["listeners"] = listeners;
		this.votelog["for"] = percentageinfavor;
		this.votelog["against"] = percentageagainst;
		this.votelog["details"] = votedata.votelog;
		
	}
	
	this.snaganimation = function(cb) {
		this.bot.snag(cb);
	}
	this.queuesong = function(songid, songname, cb) {
		this.bot.playlistAdd(songid, cb);
		console.log("You have just added " + songname + " to your queue!");
	}
	
	this.addsong = function(songdata, cb) {
		var that = this;
		var songid = songdata._id;
		var songname = songdata.metadata.song;
		
		this.snaganimation(function() {
			that.voteup(function() {
				that.queuesong(songid, songname, cb);
			});
		});
	}
	
	this.skipsong = function(cb) {
		this.bot.skip(cb);
	}
	
	this.addfan = function(fanname, cb) {
		var fanid = this.bot.getUserId(fanname);
		this.bot.becomeFan(fanid, cb);
		
		console.log("You just became a fan of " + fanname + ".");
	}
	
	this.removefan = function(fanname, fanid) {
		if (fanname == "" && typeof(fanid) != "undefined") {
			this.bot.removeFan(fanid);
		}
		else {
			var fanid = this.bot.getUserId(fanname);
			this.bot.removeFan(fanid);
		}
	}
	
	this.addfavoriteroom = function() {
		var that = this;
		this.bot.roomInfo(function(data) {
			var roomname = data.room.name;
			var roomid = data.room.roomid;
			
			that.bot.addFavorite(roomid);
			
			console.log(roomname + " has been added to your favorites!");
		});
	}
	
	this.setavatar = function(cb) {
		var that = this;
		this.bot.getAvatarIds(function(data) {
			that.bot.setAvatar(data[that.avatarcount], cb);
			that.avatarcount += 1;
		});
	}
	
	this.becomedj = function(cb) {
		var that = this;
		this.bot.addDj(cb);
	}
	
	this.enddj = function(cb) {
		var that = this;
		this.bot.remDj(this.id);
	}
	
	this.enterroom = function(roomid, cb) {
		this.bot.roomRegister(roomid, cb);
	}
	
	this.summon = function(id, cb) {
		var that = this;
		this.bot.stalk(id, true, function(data) {
			var roomname = data.room.name;
			var roomid = data.room.roomid;
			var myroom = this.roomid;
			
			that.removefan("", id);
			
			if (roomid != myroom) {
				that.bot.enterroom(roomid, cb)
			}
			else {
				console.log("You are already in " + roomname + "!");
			}
		});
	}
	
	this.sendtoroom = function(roomid, cb) {
		this.bot.enterroom(roomid, cb);
	}
	
	return this;
}

exports.start = start;