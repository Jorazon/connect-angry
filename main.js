//modules
const Discord = require("discord.js");

//local
const jsonio = require("./jsonio");

const client = new Discord.Client();

const optionsPath = "options.json";
var options;

/**
 * Load options from json file
 */
function loadOptions() {
	options = jsonio.readjson(optionsPath);
}
/**
 * Save and reload options
 */
function saveOptions() {
	jsonio.writejson(options, optionsPath);
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

	var prefix = getPrefix(message.guild.id);

	//ignore messages that don't tag the bot or start with the guild prefix
	if (
		!message.mentions.has(client.user) &&
		!message.content.startsWith(prefix)
	)
		return;

	//if bot is mentioned send prefix info as DM
	if (message.mentions.has(client.user)) {
		message.author.createDM().then((authorDMChannel) => {
			authorDMChannel.send(
				`My prefix in ${message.guild.name} is ${prefix}`,
			);
			authorDMChannel.delete();
		});
		return;
	}

	//remove prefix from the message content
	message.content = message.content.substring(prefix.length);

	//split on spaces to get params (0 should be command, rest arguments)
	var params = message.content.split(" ");

	console.log(message.createdTimestamp);
	console.log(Date.now());

	switch (params[0]) {
		case "ping":
			{
				message.channel.send(
					`Pong! ${Date.now() - message.createdTimestamp}ms`,
				);
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
					if (params.length > 1) {
						//check that a new prefix was provided
						options.guilds[message.guild.id] = params[1];
						saveOptions();
						prefix = getPrefix(message.guild.id);
						message.channel.send(`New prefix set as ${prefix}`);
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
try {
	client.login(process.argv[2] || process.env.TOKEN);
} catch {
	console.log("Invalid bot token");
}
