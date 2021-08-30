import Discord from "discord.js";
import { readjson } from "./jsonio.js";

/**
 * Update prefix
 * @param {Discord.Message} message
 * @param {string[]} params
 * @param {string} guildPrefix
 * @param {Function} getPrefix
 * @param {*} options
 * @param {Function} saveOptions
 */
export default function prefix(message, params, guildPrefix, getPrefix, options, saveOptions) {
	//check if author is a server admin
	if (message.guild.member(message.author).permissions.has("ADMINISTRATOR")) {
		//check that a new prefix was provided
		if (params.length > 1) {
			options.guilds[message.guild.id] = params[1];
			saveOptions();
			guildPrefix = getPrefix(message.guild.id);
			message.channel.send(`New prefix set as ${guildPrefix}`);
		}
	} else {
		message.channel.send(readjson("../assets/strings.json").commandNoPermission);
	}
}
