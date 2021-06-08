const fs = require("fs");

/**
 * Reads a json file
 * @param {*} path
 * @returns
 */
function readjson(path) {
	return JSON.parse(fs.readFileSync(path));
}

/**
 * Writes a json file
 * @param {*} data
 * @param {string} path
 */
function writejson(data, path) {
	fs.writeFileSync(path, JSON.stringify(data));
}

module.exports = { readjson, writejson };
