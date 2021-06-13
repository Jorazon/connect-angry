const Discord = require("discord.js");

const players = {
	EMPTY: 0,
	RED: 1,
	YELLOW: 2,
};

//0-9 keycap emojis
const numbers = [
	"\u0030\uFE0F\u20E3",
	"\u0031\uFE0F\u20E3",
	"\u0032\uFE0F\u20E3",
	"\u0033\uFE0F\u20E3",
	"\u0034\uFE0F\u20E3",
	"\u0035\uFE0F\u20E3",
	"\u0036\uFE0F\u20E3",
	"\u0037\uFE0F\u20E3",
	"\u0038\uFE0F\u20E3",
	"\u0039\uFE0F\u20E3",
];

const template = {
	id,
	board,
	turn,
	timestamp,
};

class game {
	/**
	 * Create new game
	 * @param {Discord.Message} message
	 */
	constructor(message) {
		this.message = message;
	}
}
