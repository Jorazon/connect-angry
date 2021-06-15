const { ping } = require("../commands/ping");
const { prefix } = require("../commands/prefix");
const { help } = require("../commands/help");
const { connect } = require("../games/connect/game");

module.exports = { ping, prefix, help, connect };
