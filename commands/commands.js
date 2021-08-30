const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const ping = require("./ping");
const connect = require("../games/connect/game");
const { readjson } = require("../jsonio");
/**
 * refreshes slash commands
 * @param {Discord.Client} client
 */

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN || process.argv[2]);

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

module.exports = { ping, connect, refreshCommands };
