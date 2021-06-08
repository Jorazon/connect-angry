const Discord = require("discord.js");
const { readjson } = require("../jsonio");

const permissions = {
	USER: "User",
	ADMINISTRATOR: "Admin",
};

/**
 * Sends help DM
 * @param {Discord.Message} message
 */
function help(message) {
	var isAdmin = message.guild
		.member(message.author)
		.permissions.has("ADMINISTRATOR");

	var helpMessage = "```";

	helpMessage += readHelp(permissions.USER);

	if (isAdmin) {
		helpMessage += "\n";
		helpMessage += readHelp(permissions.ADMINISTRATOR);
	}

	helpMessage += "```";

	message.author.createDM().then((authorDMChannel) => {
		authorDMChannel.send(helpMessage);
		authorDMChannel.delete();
	});
}

/**
 * Reads help text of appropriate permission level from file
 * @param {permissions} permission
 * @return {string} help text
 */
function readHelp(permission) {
	const helpFile = readjson("./commands/help.json")[permission];

	let helpText = `${permission} commands:\n`;

	Object.keys(helpFile).forEach((command) => {
		helpText += `\t${command}: ${helpFile[command]}\n`;
	});

	return helpText;
}

module.exports = { help };
