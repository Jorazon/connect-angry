/**
 *
 * @param {number} max range for random number 0 - max
 * @returns {number} generated random number
 */
function rand(max) {
	return (Math.random() * max) | 0;
}

module.exports = { rand };
