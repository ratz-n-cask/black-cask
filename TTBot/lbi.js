var LiveBotInterface = function(bot, botcontainer) {
	this.bot = bot;
	this.c = botcontainer;
	this.bi = this.c.botinfo;
	this.bb = this.c.basicbot;

	this.say = function(msg) {
		this.bb.sendmsg(msg);
	}
	this.pm = function(username, msg) {
		this.bb.makewhisper(username, msg);
	}
	this.nod = function() {
		this.bb.vote("up");
	}
	this.boo = function() {
		this.bb.vote("down");
	}
	this.hopon = function() {
		this.bb.becomedj();
	}
	this.hopoff = function() {
		this.bb.enddj();
	}
	this.addsong = function() {
		var songdata = this.bi.roominfo.songdata;
		if (songdata) {
			this.bb.addsong(songdata);
		}
		else {
			this.c.cl.logerror("songdata undefined.");
		}
	}
	this.getinfo = function(username) {
		this.bb.getuserinfo(username, false);
	}
	this.song = function() {
		this.bb.getsonginfo(true);
	}
	this.skip = function() {
		this.bb.skipsong();
	}
	this.playlistlength = function() {
		this.bb.getplaylistlength();
	}
}

exports.lbi = LiveBotInterface;