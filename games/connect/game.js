const Discord = require("discord.js");

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
	for (let y = 0; y < 7; ++y) {
		for (let x = 0; x < 7; ++x) {
			switch (y) {
				case 6:
					cat += numbers[x + 1];
					break;
				default:
					cat += emojis[(Math.random() * emojis.length) | 0];
			}
		}
		cat += "\n";
	}

	message.channel.send(cat).then(async (testmessage) => {
		for (let i = 1; i < 8; ++i) {
			testmessage.react(numbers[i]);
		}
	});
}

module.exports = { connect };
