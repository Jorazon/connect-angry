import Discord from "discord.js";
import { Routes } from "discord-api-types";
import ping from "../commands/ping.js";
import prefix from "../commands/prefix.js";
import connect from "../games/connect/game.js";
import { readjson } from "./jsonio.js";
/**
 * refreshes slash commands
 * @param {Discord.Client} client
 */
async function refreshCommands(client) {
	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];
	//const commands = readjson("./commands.json");
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			Routes.applicationGuildCommand(client.application.id, "503840746005200916"),
			{ body: commands },
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
}

export { ping, prefix, connect, refreshCommands };
