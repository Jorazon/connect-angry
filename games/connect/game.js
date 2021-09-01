const Discord = require("discord.js");
const { rand } = require("../../rand");

const players = {
	EMPTY: 0,
	RED: 1,
	YELLOW: 2,
};

//0-10 and blank keycap emojis
const numbers = [
	"0\uFE0F\u20E3",
	"1\uFE0F\u20E3",
	"2\uFE0F\u20E3",
	"3\uFE0F\u20E3",
	"4\uFE0F\u20E3",
	"5\uFE0F\u20E3",
	"6\uFE0F\u20E3",
	"7\uFE0F\u20E3",
	"8\uFE0F\u20E3",
	"9\uFE0F\u20E3",
	"\uD83D\uDD1F",
	"\uD83D\uDFE6",
];

//emojis for White Circle, Pouting Face and Angry Face
const emojis = ["\u26AA", "\uD83D\uDE21", "\uD83D\uDE20"];

const template = {
	id: "0",
	board: [],
	turn: 1,
	timestamp: 0,
};

/**
 *
 * @param {Discord.Interaction} interaction
 */
function connect(interaction) {
	let gameBoard = "";
	for (let y = 0; y < 7; ++y) {
		for (let x = 0; x < 7; ++x) {
			if (y == 6) gameBoard += numbers[x + 1];
			else gameBoard += emojis[rand(emojis.length)];
		}
		gameBoard += "\n";
	}

	var options = numbers
		.slice()
		.filter((v, i) => i >= 1 && i <= 7)
		.map((emoji, i) => ({
			label: `${i + 1}`,
			value: `${i}_${interaction.id}`,
			emoji: {
				name: emoji,
				id: null,
			},
		}));

	var reply = {
		content: `${emojis[rand(emojis.length)]}'s turn`,
		embeds: [new Discord.MessageEmbed({ title: gameBoard })],
		components: [
			new Discord.MessageSelectMenu({
				minValues: 1,
				maxValues: 1,
				options: options,
			}).toJSON(),
		],
	};
	console.log(reply);
	interaction.reply(reply).catch((error) => {
		console.error(error);
	});
}

module.exports = { connect };
