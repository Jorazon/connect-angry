const Discord = require("discord.js");
const { rand } = require("../../rand");
const { writejson } = require("../../jsonio");

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
const slotEmojis = ["\u26AA", "\uD83D\uDE21", "\uD83D\uDE20"];

//game object template
const template = {
	messageId: "0",
	rows: 6,
	columns: 7,
	board: [[0]],
	turn: 1,
	timestamp: 0,
};

/**
 * Generates board string
 * @param gameObject game object
 * @param {boolean} win defaults to false
 * @returns {string} game board string form
 */
function boardToString(gameObject, win = false) {
	let boardString = ""; //initialize to empty string
	let board = gameObject.board; //get board for simplicity
	//iterate over board
	board.forEach((row) => {
		row.forEach((slotPlayer) => {
			boardString += slotEmojis[slotPlayer]; //add slot with player color or empty
		});
		boardString += "\n"; //advance to next row
	});
	//add column numbers
	board[0].forEach((column, i) => {
		boardString += numbers[i + 1].emoji;
	});
	//add turn or win indicator
	if (win) boardString += `\t${slotEmojis[gameObject.turn]} wins`;
	else boardString += `\t${slotEmojis[gameObject.turn]}'s turn`;
	return boardString;
}

/**
 * Creates filled 2D array of given size
 * @param {number} x width
 * @param {number} y height
 * @param fill Object to fill array with. Defaut 0
 * @returns
 */
function create2DArray(x, y, fill = 0) {
	let array = [];
	for (let i = 0; i < x; ++i) {
		array[i] = new Array(y).fill(fill);
	}
	return array;
}

/**
 * Create game response message
 * @param gameObject game object
 * @returns {Discord.MessageOptions} Message
 */
function createMessage(gameObject) {
	return {
		content: boardToString(gameObject),
		components: [
			new Discord.MessageActionRow().addComponents(
				new Discord.MessageSelectMenu({
					custom_id: `connect_col_select_${gameObject.id}`,
					placeholder: "Choose column",
					minValues: 1,
					maxValues: 1,
					options: numbers
						.slice()
						.filter((v, i) => i >= 1 && i <= 7)
						.map((number, i) => ({
							label: `${number.name}`,
							value: `${i}`,
							emoji: {
								name: number.emoji,
								id: number.id ?? null,
							},
						})),
				}),
			),
		],
		fetchReply: true,
	};
}

/**
 * Handle connect angry interactions
 * @param {Discord.Interaction} interaction
 */
function connect(interaction) {
	switch (interaction.type) {
		case "APPLICATION_COMMAND":
			startGame(interaction);
			break;
		case "MESSAGE_COMPONENT":
			updateGame(interaction);
			break;
	}
}

/**
 * Start the game
 * @param {Discord.Interaction} interaction
 */
function startGame(interaction) {
	let gameObject = {
		...template,
		messageId: interaction.id,
		timestamp: interaction.createdTimestamp,
		board: create2DArray(template.rows, template.columns),
	};

	interaction
		.reply(createMessage(gameObject))
		.then((reply) => {
			let id = reply.interaction.id;
			//TODO save gameObject to database
		})
		.catch((error) => {
			console.error(error);
		});
}

/**
 * update game
 * @param {Discord.Interaction} interaction
 */
function updateGame(interaction) {
	let id = interaction.message.interaction.id;

	let gameObject = {
		...template,
		board: create2DArray(template.rows, template.columns),
	}; //TODO remove when database works }; //TODO read gameObject from database

	gameObject.turn = gameObject.turn == 1 ? 2 : 1; //switch turn

	let board = gameObject.board;
	//board[rand(board.length)][rand(board[0].length)] = 1;
	board[0][0] = 1;
	gameObject.board = board;
	interaction.update({ content: boardToString(gameObject) });
	//TODO save gameObject to database
}

module.exports = { connect };
