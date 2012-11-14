var ColorLog = require("../ColorLog/colorlog").ColorLog;
var BotInfo = require("./botinfo").BotInfo;
var BasicBot = require("./BasicBot").start;

var BotContainer = function(bot) {
	this.cl = new ColorLog();
	this.botinfo = new BotInfo(bot, this);
	this.basicbot = new BasicBot(bot, this);

	return this;
}

exports.BotContainer = BotContainer;