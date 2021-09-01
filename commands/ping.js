const Discord = require("discord.js");

/**
 * Sends ping response
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */
function ping(client, interaction) {
	interaction.reply({ content: "Pinging...", fetchReply: true }).then((reply) => {
		const embed = new Discord.MessageEmbed().setFields([
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
}

module.exports = { ping };
