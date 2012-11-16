function start(bot, botcontainer) {
	this.bot = bot;
	this.c = botcontainer;
	this.cl = this.c.cl;

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
		var that = this;
		this.bot.pm(msg, userid, function(data) {
			if (data.success) {
				that.cl.logmessage("success: true");
			}
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
		
		this.cl.logdata("up: " + vl["up"]);
		this.cl.logdata("for: " + vl["for"]);
		this.cl.logdata("listeners: " + vl["listeners"] + "\n");

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
	this.getplaylistlength = function(cb) {
		var that = this;
		this.bot.playlistAll(function(data) {
			var list = data.list;
			that.cl.logdata("Playlist length: " + list.length);
			if (cb) {
				cb(list.length);
			}
		});
	}
	this.snaganimation = function(cb) {
		this.bot.snag(cb);
	}
	this.queuesong = function(songid, songname, cb) {
		var that = this;
		this.getplaylistlength(function(length) {
			that.bot.playlistAdd(songid, length, function(data) {
				if (data.success) {
					that.cl.logmessage("You have just added " + songname + " to your queue!");
				}
				else {
					that.cl.logerror("Could not add " + songname + " to queue.");
				}
			})
		});
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
		var that = this;
		this.bot.skip(function(data) {
			if (data.success) {
				that.cl.logmessage("You just skipped this song.");
			}
			else {
				that.cl.logerror("You can't skip this song.");
			}
		});
	}

	this.addfan = function(fanname, cb) {
		var that = this;
		this.getuserinfo(fanname, false, function(data) {
			var fanid = data._id;
			that.bot.becomeFan(fanid, function(data) {
				if (data.success) {
					that.cl.logmessage("You just became a fan of " + fanname + ".");
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
					that.cl.logcomment("You just unfanned " + fanname + ".");
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
				that.cl.logmessage(roomname + " has been added to your favorites!");
			}
			else {
				that.cl.logmessage(roomname + " is already one of your favorite rooms!");
			}
		});
	}
	
	this.becomedj = function(cb) {
		var that = this;
		this.bot.addDj(function(data) {
			if (data.success) {
				that.cl.logmessage("You just hopped on the booth.")
			}
		});
	}
	
	this.enddj = function(cb) {
		var that = this;
		this.bot.remDj(this.id, function(data) {
			if (data.success) {
				that.cl.logmessage("You just hopped off the booth.");
			}
		});
	}
	
	this.enterroom = function(roomid, cb) {
		this.bot.roomRegister(roomid, cb);
	}
	this.getrooms = function(num, cb) {
		var that = this;
		this.bot.listRooms(num, function(data) {
			that.cl.logdata(data.rooms);
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
		var that = this;
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
				that.cl.logerror(roomname + " room not found... yet.");
			}
		});
	}
	this.getroominfo = function(songinfo, cb) {
		var that = this;
		this.bot.roomInfo(songinfo, function(data) {
			console.log(data);
		});
	}
	this.getroomusers = function(songinfo, cb) {
		var that = this;
		this.bot.roomInfo(songinfo, function(data) {
			var users = data.users;
			for (var i = 0; i < users.length; i++) {
				var user = users[i];
				for (var key in user) {
					that.cl.logdata(key + ": " + user[key]);
				}
				console.log("\n");
			}
		});
	}
	this.getuserinfo_raw = function(text, splitstring, songinfo, cb) {
		var username = text.split(splitstring)[1];
		this.getuserinfo(username, songinfo, cb);
	}
	this.getuserinfo = function(username, songinfo, cb) {
		var that = this;
		this.bot.roomInfo(songinfo, function(data) {
			var allusers = data.users;
			var found = false;
			for (var i = 0; i < allusers.length; i++) {
				var thisuser = allusers[i];
				var thisusername = thisuser.name;
				if (thisusername == username) {
					//that.cl.logdata(thisuser);
					for (var key in thisuser) {
						that.cl.logdata(key + ": " + thisuser[key]);
					}
					console.log("\n");
					found = true;
					if (cb) {
						cb(thisuser);
					}
				}
			}
			if (!found) {
				that.cl.logerror(username + " not found.");
			}
		});
	}
	this.getsonginfo = function(pm) {
		var that = this;
		this.bot.roomInfo(true, function(data) {
			var roommetadata = data.room.metadata;
			var songlog = data.room.metadata.songlog;
			var currentsong = songlog[songlog.length - 1];
			var currentsongmd = currentsong.metadata;
			if (pm) {
				for (var key in currentsong) {
					that.cl.logdata(key + ": " + currentsong[key]);
				}
				console.log("\n");
				for (var key in currentsongmd) {
					that.cl.logdata(key + ": " + currentsongmd[key]);	
				}
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
			this.cl.logerror(roomname + " is not a listed room.");
		}
	}

	return this;
}

exports.start = start;