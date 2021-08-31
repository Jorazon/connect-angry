const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ping } = require("./ping");
const { connect } = require("../games/connect/game");
const { readjson } = require("../jsonio");

/**
 * refreshes slash commands
 * @param {Discord.Client} client bot client
 * @param {string} token bot token
 */
async function refreshCommands(client, token) {
	const GUILD_ID = "503840746005200916";
	const CLIENT_ID = client.application.id;

	const rest = new REST({ version: "9" }).setToken(token);

	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];
	//const commands = readjson("./commands.json");

	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
}

module.exports = { ping, connect, refreshCommands };
