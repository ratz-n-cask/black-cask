var ColorLog = require("../ColorLog/colorlog").ColorLog;
var BotInfo = require("./botinfo").BotInfo;
var BasicBot = require("./BasicBot").start;
var LBI = require("./lbi").lbi;

var BotContainer = function(bot) {
	this.cl = new ColorLog();
	this.botinfo = new BotInfo(bot, this);
	this.basicbot = new BasicBot(bot, this);
	this.lbi = new LBI(bot, this);

	return this;
}

exports.BotContainer = BotContainer;