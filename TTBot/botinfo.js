var BotInfo = function(bot, botcontainer) {
	this.bot = bot;
	this.c = botcontainer;

	this.AUTH = "BubUFZiLBRCpkFrVMVXFCcxy";
	this.USERID = "5057de39aaa5cd46210000be";
	this.ROOMID = "4e278f3414169c7c218d136c";
	this.MASTERID = "4ffc9d11eb35c124cb00001d";

	this.sayings = new Array();
	this.rooms = {
		"coak": "4e278f3414169c7c218d136c",
		"lbjam": "4ff5bf40eb35c163d200001f",
		"fam": "509d57d8eb35c178ba6c826f",
		"acth": "4df8319e9021683a2f000a55",
		"coding": "4dde3859845daf0d3a000002" 
	}
	this.playlists = new Object();
	this.admins = [this.MASTERID];

	this.profile = new Object();
	this.roominfo = new Object();
	
}

exports.BotInfo = BotInfo;