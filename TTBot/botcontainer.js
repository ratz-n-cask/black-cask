var BotInfo = require("./botinfo").BotInfo;
var BasicBot = require("./BasicBot").start;

var BotContainer = function(bot) {
	this.botinfo = new BotInfo(bot, this);
	this.basicbot = new BasicBot(bot, this);

	return this;
}

exports.BotContainer = BotContainer;