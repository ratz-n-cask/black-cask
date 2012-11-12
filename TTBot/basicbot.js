function start(bot, botcontainer) {
	this.bot = bot;
	this.c = botcontainer;
	this.botinfo = this.c.botinfo;

	this.id = this.bot.userId;
	this.roomid = this.bot.roomId;
	
	this.avatarcount = 0;
	
	this.votelog = {
		up: 0,
		down: 0,
		listeners: 0,
		details: new Array()
	}
	
	this.getfavoriterooms = function(cb) {
		var that = this;
		this.bot.getFavorites(function(data) {
			console.log(data);
			if (cb) {
				cb(data);
			}
		});
	}
		
	this.addroom = function(roomname, roomid) {
		this.botinfo.rooms[roomname] = roomid;
	}
	this.addplaylist = function(playlistname) {
		this.botinfo.playlists[playlistname] = new Array();
	}
	
	this.addsaying = function(phrase) {
		this.botinfo.sayings.push(phrase);
	}
	this.addsayings = function(phrases) {
		for (var i = 0; i < phrases.length; i++) {
			this.addsaying(phrase[i]);
		}
	}
	
	this.sayphrase = function(num) {

	}
	this.sendmsg = function(msg, user) {
		if (typeof(user) != "undefined") {
			this.bot.speak("@" + user + " " + msg);
		}
		else {
			this.bot.speak(msg);
		}
	}
	this.whisper = function(msg, userid, cb) {
		this.bot.pm(msg, userid, function(data) {
			
		});
	}
	this.makewhisper = function(username, msg) {
		var that = this;
		this.getuserinfo(username, false, function(data) {
			var userid = data._id;
			that.whisper(msg, userid);
		});
		
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
		var vl = this.recordvotes(metadata);
		
		console.log("up: " + vl["up"]);
		console.log("for: " + vl["for"]);
		console.log("listeners: " + vl["listeners"] + "\n");

		if (vl["for"] >= 0.5) {
			var songdata = metadata.current_song;
			var songname = songdata.metadata.song;
			this.addsong(songdata);
			
			this.sendmsg(":sound:" + songname + " has been added by popular demand.");
		}
	}
	
	this.recordvotes = function(metadata) {
		var listeners = metadata.listeners;
		var votedata = metadata.votelog;
		console.log("metadata: " + metadata + "\n");		
		var uptotal = metadata.upvotes;
		var downtotal = metadata.downvotes;
		
		var percentageinfavor = uptotal/listeners;
		var percentageagainst = downtotal/listeners;
		
		var votelog = {}
		
		votelog["up"] = uptotal;
		votelog["down"] = downtotal;
		votelog["listeners"] = listeners;
		votelog["for"] = percentageinfavor;
		votelog["against"] = percentageagainst;

		return votelog;
	}
	
	this.snaganimation = function(cb) {
		this.bot.snag(cb);
	}
	this.queuesong = function(songid, songname, cb) {
		this.bot.playlistAdd(songid, function(data) {
			if (data.success) {
				console.log("You have just added " + songname + " to your queue!");
			}
			else {
				console.log("Could not add " + songname + " to queue.");
			}
		})
		
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
		var that = this;
		this.getuserinfo(fanname, false, function(data) {
			var fanid = data._id;
			that.bot.becomeFan(fanid, function(data) {
				if (data.success) {
					console.log("You just became a fan of " + fanname + ".");
				}
			});
		});
	}
	
	this.removefan = function(fanname) {
		var that = this;
		this.getuserinfo(fanname, false, function(data) {
			var fanid = data._id;
			that.bot.removeFan(fanid, function(data) {
				if (data.success) {
					console.log("You just unfanned " + fanname + ".");
				}
			});
		});
	}
	
	this.addfavoriteroom = function() {
		var that = this;
		this.bot.roomInfo(function(data) {
			var roomname = data.room.name;
			var roomid = data.room.roomid;
			var myroom = that.roomid;

			if (roomid != myroom) {
				that.bot.addFavorite(roomid);
				console.log(roomname + " has been added to your favorites!");
			}
			else {
				console.log(roomname + " is already one of your favorite rooms!");
			}
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
	this.getrooms = function(num, cb) {
		this.bot.listRooms(num, function(data) {
			console.log(data.rooms);
			if (cb) {
				cb(data);
			}
		});
	}
	this.getroominfo_raw = function(text, splitstring, songinfo) {
		var that = this;
		var roomname = text.split(splitstring)[1];
		if (roomname) {
			roomname = roomname.toLowerCase();
			this.getspecificroominfo(roomname);
		}
		else {
			this.getroominfo(songinfo);
		}
	}
	this.getspecificroominfo = function(roomname) {
		this.getrooms(20, function(data) {
			var found = false;
			for (var i = 0; i < data.rooms.length; i++) {
				var thisroom = data.rooms[i][0];
				var thisroomname = thisroom.name_lower;
				var thisroomid = thisroom.roomid;
				if (thisroomname = roomname) {
					console.log(thisroom);
					found = true;
				}
			}
			if (!found) {
				console.log(roomname + " room not found... yet.");
			}
		});
	}
	this.getroominfo = function(songinfo, cb) {
		this.bot.roomInfo(songinfo, function(data) {
			console.log(data);
		});
	}
	this.getroomusers = function(songinfo, cb) {
		this.bot.roomInfo(songinfo, function(data) {
			console.log(data.users);
		});
	}
	this.getuserinfo_raw = function(text, splitstring, songinfo, cb) {
		var username = text.split(splitstring)[1];
		this.getuserinfo(username, songinfo, cb);
	}
	this.getuserinfo = function(username, songinfo, cb) {
		this.bot.roomInfo(songinfo, function(data) {
			var allusers = data.users;
			var found = false;
			for (var i = 0; i < allusers.length; i++) {
				var thisuser = allusers[i];
				var thisusername = thisuser.name;
				if (thisusername == username) {
					console.log(thisuser);
					found = true;
					if (cb) {
						cb(thisuser);
					}
				}
			}
			if (!found) {
				console.log(username + " not found.");
			}
		});
	}
	this.getsonginfo = function(pm) {
		var that = this;
		this.bot.roomInfo(true, function(data) {
			var roommetadata = data.room.metadata;
			var songlog = data.room.metadata.songlog;
			var currentsong = songlog[songlog.length - 1];
			if (pm) {
				console.log(currentsong);	
			}
			else {
				that.sendmsg(":sound::" + currentsong.metadata.song + " by " + currentsong.metadata.artist + ". " + roommetadata.upvotes + "+ // " + roommetadata.downvotes + "-.");
			}
		});
	}
	this.sendtoroom_raw = function(text, splitstring, cb) {
		var roomname = text.split(splitstring)[1];
		this.sendtoroom(roomname, cb);
	}
	this.sendtoroom = function(roomname, cb) {
		var roomid = this.botinfo.rooms[roomname];
		if (roomid) {
			this.enterroom(roomid, cb);
		}
		else {
			console.log(roomname + " is not a listed room.");
		}
	}

	return this;
}

exports.start = start;