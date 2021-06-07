const Discord = require("discord.js");

/**
 * Sends ping response
 * @param {Discord.client} client
 * @param {Discord.message} message
 */
function ping(client, message) {
	message.channel.send("Pong!").then(async (pingMessage) => {
		pingMessage.edit(
			`Pong! Client: ${
				pingMessage.createdTimestamp - message.createdTimestamp
			}ms, API: ${client.ws.ping}ms`,
		);
		console.log("pinged");
	});
}

exports.ping = ping;
