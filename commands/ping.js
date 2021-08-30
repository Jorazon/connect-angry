const Discord = require("discord.js");

/**
 * Sends ping response
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */
function ping(client, interaction) {
	interaction.reply("Pong!").then(async (pingMessage) => {
		pingMessage.edit(
			`Pong! Client: ${pingMessage.createdTimestamp - message.createdTimestamp}ms, API: ${
				client.ws.ping
			}ms`,
		);
	});
}

module.exports = { ping };
