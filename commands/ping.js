import Discord from Discord;

/**
 * Sends ping response
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
export default function ping(client, message) {
	message.channel.send("Pong!").then(async (pingMessage) => {
		pingMessage.edit(
			`Pong! Client: ${pingMessage.createdTimestamp - message.createdTimestamp}ms, API: ${
				client.ws.ping
			}ms`,
		);
	});
};
