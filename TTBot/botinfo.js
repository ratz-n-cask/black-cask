var BotInfo = function(bot, botcontainer) {
	this.bot = bot;
	this.c = botcontainer;

	this.AUTH = "BubUFZiLBRCpkFrVMVXFCcxy";
	this.USERID = "5057de39aaa5cd46210000be";
	this.ROOMID = "4e278f3414169c7c218d136c";
	this.MASTERID = "4ffc9d11eb35c124cb00001d";

	this.sayings = {
		help: "/nod to bop \n /boo to lame \n /addthis to add the song to my queue \n /song to get the song info \n /skipthis to skip my song if I'm a DJ \n /about to learn more about me.",
		nopermission: "What's that? You don't have the proper badge!",
		iambot: "Sorry, I am a bot and cannot answer you. For a list of my commands, pm me with 'help' as your message."
	}
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