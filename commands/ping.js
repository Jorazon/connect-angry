const Discord = require("discord.js");

/**
 * Sends ping response
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */
function ping(client, interaction) {
	interaction.reply("Pinging...").then(() => {
		interaction.fetchReply().then((reply) => {
			const embed = new Discord.MessageEmbed();
			embed.setFields([
				{
					name: "Client: ",
					value: `${reply.createdTimestamp - interaction.createdTimestamp}ms`,
					inline: true,
				},
				{
					name: "API: ",
					value: `${client.ws.ping}ms`,
					inline: true,
				},
			]);
			interaction.editReply({ content: "Pong!", embeds: [embed] });
		});
	});
}

module.exports = { ping };
