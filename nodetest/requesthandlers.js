var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called.");
	var content = "empty";
	
	exec("ls -lah", function(error, stdout, stderr) {
		response.writeHead(200, {"Content-type":"text/plain"});
		response.write(stdout);
		console.log(stdout);
		response.end();
	});

}

function upload(response) {
	console.log("Request handler 'upload' was called");
	response.writeHead(200, {"Content-type":"text/plain"});
	response.write("Hello Upload");
	response.end();
	return "Hello Upload"
}

exports.start = start;
exports.upload = upload;