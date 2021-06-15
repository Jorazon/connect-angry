const Discord = require("discord.js");

const players = {
	EMPTY: 0,
	RED: 1,
	YELLOW: 2,
};

//0-10 keycap emojis
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
];

//emojis for White Circle, Pouting Face and Angry Face
const emojis = ["\u26AA", "\uD83D\uDE21", "\uD83D\uDE20"];

/*
const template = {
	id,
	board,
	turn,
	timestamp,
};
*/

/**
 *
 * @param {Discord.Message} message
 */
function connect(message) {
	let cat = "";
	numbers.concat(emojis).forEach((key) => {
		cat += key;
		cat += " ";
	});
	message.channel.send(cat);
}

module.exports = { connect };
