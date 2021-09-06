const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readjson } = require("../jsonio");
//commands-----------------------------------------------
const { ping } = require("../commands/ping");
const { connect } = require("../games/connect/game");
//-------------------------------------------------------

/**
 * Refreshes slash commands
 * @param {Discord.Client} client bot client
 * @param {string} token bot token
 */
async function refreshCommands(client, token) {
	const GUILD_ID = "503840746005200916";
	const CLIENT_ID = client.application.id;

	const rest = new REST({ version: "9" }).setToken(token);

	const commands = readjson("./commands/commands.json").commands;

	try {
		console.log("Started refreshing application [/] commands.");

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

		console.log("Successfully reloaded application [/] commands.");
	} catch (error) {
		console.error(error);
	}
}

/**
 * Handle application commands
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */
function handleCommands(client, interaction) {
	if (interaction.isCommand()) {
		switch (interaction.commandName) {
			case "ping":
				{
					ping(client, interaction);
				}
				break;
			case "connect":
				{
					connect(interaction);
				}
				break;
		}
	} else if (interaction.isMessageComponent) {
		switch (interaction.message.interaction.commandName) {
			case "connect":
				connect(interaction);
		}
	}
}

module.exports = { refreshCommands, handleCommands };
