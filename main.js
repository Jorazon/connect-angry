const { Client, Intents } = require("discord.js");
const { readjson, writejson } = require("./jsonio.js");
const { refreshCommands, ping, connect } = require("./commands/commands.js");

//get bot token from docker env variable TOKEN or node first parameter
const token = process.env.TOKEN || process.argv[2];

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	//refresh slash commands if REFRESHCOMMANDS is setto "true" in docker-compose.yml
	if (process.env.REFRESHCOMMANDS == "true" || process.argv[3] == "true") {
		refreshCommands(client, token);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "ping") {
		await interaction.reply("Pong!");
	}
	switch (params[0]) {
		case "ping":
			{
				ping(client, interaction);
			}
			break;
		case "connect":
			{
				connect(message);
			}
			break;
	}
});

//login
client.login(token).catch(() => {
	console.log("Invalid bot token");
});
