var colorize = require("colorize");

var ColorLog = function() {
	this.logcolortext = function(text,color) {
		var fulltext = colorize.ansify("#" + color + "[" + text + "]");
		console.log(fulltext);
	}
	this.red = function(text) {
		this.logcolortext(text, "red");
	}
	this.green = function(text) {
		this.logcolortext(text, "green");
	}
	this.yellow = function(text) {
		this.logcolortext(text, "yellow");
	}
	this.blue = function(text) {
		this.logcolortext(text, "blue");
	}
	this.magenta = function(text) {
		this.logcolortext(text, "magenta");
	}
	this.cyan = function(text) {
		this.logcolortext(text, "cyan");
	}
	this.white = function(text) {
		this.logcolortext(text, "white");
	}

	this.bold = function(text) {
		this.logcolortext(text, "bold");
	}
	this.italic = function(text) {
		this.logcolortext(text, "italic");
	}
	this.underline = function(text) {
		this.logcolortext(text, "underline");
	}

	this.logdata = function(text) {
		this.green(text);
	}
	this.logerror = function(text) {
		this.red(text);
	}
	this.logmessage = function(text) {
		this.cyan(text);
	}
	this.logcomment = function(text) {
		this.white(text);
	}
}

exports.ColorLog = ColorLog;