const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
const { refreshCommands, handleCommands } = require("./commands/commands.js");

dotenv.config();

//get bot token from docker env variable TOKEN or node first parameter
let token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);

	//refresh slash commands if REFRESHCOMMANDS is set to "true" in docker-compose.yml
	if (process.env.REFRESHCOMMANDS == "true") {
		refreshCommands(client, token);
	}
});

client.on("interactionCreate", async (interaction) => {
	handleCommands(interaction);
});

//login
client.login(token).catch((error) => {
	console.log("Invalid bot token");
	console.error(error);
});
