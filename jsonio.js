const fs = require('fs');

function readjson(path){
	return JSON.parse(fs.readFileSync(path));
}

function writejson(data, path){
	fs.writeFileSync(path, JSON.stringify(data));
}

exports.writejson = writejson;
exports.readjson = readjson;