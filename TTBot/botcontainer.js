var colorize = require("colorize");
var BotInfo = require("./botinfo").BotInfo;
var BasicBot = require("./BasicBot").start;

var BotContainer = function(bot) {
	this.botinfo = new BotInfo(bot, this);
	this.basicbot = new BasicBot(bot, this);
	this.logcolortext = function(text,color) {

		var fulltext = colorize.ansify("#" + color + "[" + text + "]");
		console.log(fulltext);

	}
	return this;
}

exports.BotContainer = BotContainer;