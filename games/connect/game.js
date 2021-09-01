const Discord = require("discord.js");
const { rand } = require("../../rand");
const { writejson } = require("../../jsonio");

const players = {
	EMPTY: 0,
	RED: 1,
	YELLOW: 2,
};

//0-10 and blank keycap emojis
const numbers = [
	{ emoji: "0\uFE0F\u20E3", name: "Zero" },
	{ emoji: "1\uFE0F\u20E3", name: "One" },
	{ emoji: "2\uFE0F\u20E3", name: "Two" },
	{ emoji: "3\uFE0F\u20E3", name: "Three" },
	{ emoji: "4\uFE0F\u20E3", name: "Four" },
	{ emoji: "5\uFE0F\u20E3", name: "Five" },
	{ emoji: "6\uFE0F\u20E3", name: "Six" },
	{ emoji: "7\uFE0F\u20E3", name: "Seven" },
	{ emoji: "8\uFE0F\u20E3", name: "Eight" },
	{ emoji: "9\uFE0F\u20E3", name: "Nine" },
	{ emoji: "\uD83D\uDD1F", name: "Ten" },
	{ emoji: "\uD83D\uDFE6", name: "Blank" },
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
 * Generates board string
 * @returns {string} game board string form
 */
function boardToString() {
	let gameBoard = "";
	for (let y = 0; y < 7; ++y) {
		for (let x = 0; x < 7; ++x) {
			if (y == 6) gameBoard += numbers[x + 1].emoji;
			else gameBoard += emojis[rand(emojis.length)];
		}
		if (y != 6) gameBoard += "\n";
	}
	gameBoard += `\t${emojis[rand(emojis.length)]}'s turn`;
	return gameBoard;
}

/**
 *
 * @param {Discord.Interaction} interaction
 */
function connect(interaction) {
	let gameBoard = boardToString();

	var options = numbers
		.slice()
		.filter((v, i) => i >= 1 && i <= 7)
		.map((number, i) => ({
			label: `${number.name}`,
			value: `${i}_${interaction.id}`,
			emoji: {
				name: number.emoji,
				id: null,
			},
		}));

	var reply = {
		content: gameBoard,
		components: [
			{
				type: 1,
				components: [
					new Discord.MessageSelectMenu({
						custom_id: "col_select",
						placeholder: "Choose column",
						minValues: 1,
						maxValues: 1,
						options: options,
					}).toJSON(),
				],
			},
		],
	};

	interaction.reply(reply).catch((error) => {
		console.error(error);
	});
}

module.exports = { connect };
