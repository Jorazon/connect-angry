const fs = require("fs");

/**
 * Reads a json file
 * @param {*} path file path
 * @returns file data
 */
function readjson(path) {
	return JSON.parse(fs.readFileSync(path));
}

/**
 * Writes a json file
 * @param {*} data data to write to file
 * @param {string} path file path
 */
function writejson(data, path) {
	fs.writeFileSync(path, JSON.stringify(data));
}

module.exports = { readjson, writejson };
