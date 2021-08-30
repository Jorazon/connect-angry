const { Client, Intents } = require("discord.js");
const { readjson, writejson } = require("./jsonio.js");
const { refreshCommands, ping, connect } = require("./commands/commands.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	console.log(process.env.REFRESHCOMMANDS);
	if (process.env.REFRESHCOMMANDS == "true") refreshCommands(client);
});

client.on("message", (message) => {
	if (message.author.bot) return; //ignore bot messages

	var guildPrefix = getPrefix(message.guild.id);

	//ignore messages that don't tag the bot or start with the guild prefix
	if (!message.mentions.has(client.user) && !message.content.startsWith(guildPrefix)) return;

	//if bot is mentioned send prefix info as DM
	if (message.mentions.has(client.user)) {
		message.author.createDM().then((authorDMChannel) => {
			authorDMChannel.send(`My prefix in ${message.guild.name} is ${guildPrefix}`);
			authorDMChannel.delete();
		});
		return;
	}

	//remove prefix from the message content
	message.content = message.content.substring(guildPrefix.length);

	//split on spaces to get params (0 should be command, rest arguments)
	var params = message.content.split(" ");

	switch (params[0]) {
		case "ping":
			{
				ping(client, message);
			}
			break;
		case "connect":
			{
				connect(message);
			}
			break;
	}
});

//try login with docker env variable TOKEN or node parameter
client.login(process.env.TOKEN || process.argv[2]).catch(() => {
	console.log("Invalid bot token");
});
