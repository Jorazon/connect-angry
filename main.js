//modules
const Discord = require("discord.js");

//local
const { readjson, writejson } = require("./jsonio");
const { ping, prefix } = require("./commands/commands");

const client = new Discord.Client();

const optionsPath = "options.json";
var options;

/**
 * Load options from json file
 */
function loadOptions() {
	options = readjson(optionsPath);
}
/**
 * Save and reload options
 */
function saveOptions() {
	writejson(options, optionsPath);
	loadOptions();
}

loadOptions();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

/**
 * Get guild prefix
 * @param {string} guildID
 * @returns {string} guild prefix or default if unset
 */
function getPrefix(guildID) {
	return options.guilds[guildID] || options.guilds.default;
}

client.on("message", (message) => {
	if (message.author.bot) return; //ignore bot messages

	var guildPrefix = getPrefix(message.guild.id);

	//ignore messages that don't tag the bot or start with the guild prefix
	if (
		!message.mentions.has(client.user) &&
		!message.content.startsWith(guildPrefix)
	)
		return;

	//if bot is mentioned send prefix info as DM
	if (message.mentions.has(client.user)) {
		message.author.createDM().then((authorDMChannel) => {
			authorDMChannel.send(
				`My prefix in ${message.guild.name} is ${guildPrefix}`,
			);
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
		case "help":
		case "prefix":
			{
				//check if author is a server admin
				if (
					message.guild
						.member(message.author)
						.permissions.has("ADMINISTRATOR")
				) {
					//check that a new prefix was provided
					if (params.length > 1) {
						options.guilds[message.guild.id] = params[1];
						saveOptions();
						guildPrefix = getPrefix(message.guild.id);
						message.channel.send(
							`New prefix set as ${guildPrefix}`,
						);
					}
				}
			}
			break;
		case "connect":
			{
				message.channel.send("not yet implemented"); //TODO
			}
			break;
	}
});

//try login with docker env variable TOKEN or node parameter
client.login(process.env.TOKEN || process.argv[2]).catch(() => {
	console.log("Invalid bot token");
});
