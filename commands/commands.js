const Discord = require("discord.js");
const axios = require("axios");
const ping = require("./ping");
const connect = require("../games/connect/game");
const { readjson } = require("../jsonio");

/**
 * refreshes slash commands
 * @param {Discord.Client} client bot client
 * @param {string} token bot token
 */
async function refreshCommands(client, token) {
	const url = `https://discord.com/api/v8/applications/${client.application.id}/guilds/503840746005200916/commands`;

	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];
	//const commands = readjson("./commands.json");

	const headers = {
		headers: {
			Authorization: `Bot ${token}`,
			"Content-type": "application/json",
		},
	};

	try {
		console.log("Started refreshing application (/) commands.");
		for (let command in commands) {
			axios.default
				.post(url, command, headers)
				.then((response) => console.log(response.data))
				.catch((error) => console.log(error.response));
		}

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error("bruh");
	}
}

module.exports = { ping, connect, refreshCommands };
