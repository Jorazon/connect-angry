const Discord = require("discord.js");

/**
 * Sends ping response
 * @param {Discord.client} client
 * @param {Discord.message} message
 */
function ping(client, message) {
	message.channel.send(
		//`Pong! ${Date.now() - message.createdTimestamp}ms`,
		`Pong! ${client.ws.ping}ms`,
	);
}

module.exports = { ping };
