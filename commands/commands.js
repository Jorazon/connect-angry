import ping from "../commands/ping";
import prefix from "../commands/prefix";
import connect from "../games/connect/game";

const refresh = async () => {
	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];

	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
};

module.exports = { ping, prefix, connect };
