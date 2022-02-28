const fetch = import('node-fetch');
const _ = require('lodash');
const get_tail = async hash => {
	if (hash.toLowerCase() == 'xch') {
		return {
			hash: '1',
			code: 'XCH',
			name: 'Chia',
			description: 'Green money for a digital age.',
		};
	}
	const catDetails = await get_tails();
	const filteredCats = _.filter(catDetails.tails, tailItem => tailItem.hash.toLowerCase() == hash.toLowerCase());
	if (filteredCats.length > 0) {
		return filteredCats[0];
	}
	else {
		return {
			hash: hash,
			code: 'Unknown',
			name: 'Unknown',
			description: 'Unknown',
		};
	}
};
module.exports.get_tail = get_tail;
let tails = null;
let lastTailsUpdate = new Date(0);
const get_tails = async () => {
	const now = new Date();
	if (!tails || (now - lastTailsUpdate > 300 * 1000)) {
		console.info(`get_tails: Cache too old (last updated ${lastTailsUpdate}). Fetching fresh results...`);
		const f = await fetch;
		const results = await f.default(
			`${process.env.TAIL_DATABASE_API_URL}/tails`,
			{
				method: 'get',
				headers: {
					'Accept': 'application/json',
					'x-api-version': 2,
				},
			},
		);
		const resultsJson = await results.json();
		tails = resultsJson.tails;
		console.info(`get_tails: Fetched and cached ${tails.length} tokens.`);
		lastTailsUpdate = new Date();
	}
	return tails;
};
module.exports.get_tails = get_tails;