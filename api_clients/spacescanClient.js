const fetch = import('node-fetch');
const _ = require('lodash');

let spacescanResults = new Array();
let spacescanResultsLastUpdate = new Date(0);
const spacescanGetCatsApi = async () => {
	try {
		const now = new Date();
		if (!spacescanResults || (now - spacescanResultsLastUpdate > 300 * 1000)) {
			console.info(`spacescanGetCatsApi: Cache too old (last updated ${spacescanResultsLastUpdate}). Fetching fresh results...`);
			spacescanResultsLastUpdate = new Date();
			const f = await fetch;
			let cats = new Array();
			let page = 0;
			let more = true;
			do {
				page++;
				console.info(`spacescanGetCatsApi: Fetching page ${page}...`);
				const results = await f.default(
					`${process.env.SPACESCAN_API_URL}/cats?page=${page}`,
					{
						method: 'get',
						headers: {
							'Accept': 'application/json',
						},
					},
				);
				const resultsJson = await results.json();
				cats = _.union(cats, spacescanResults = resultsJson.cats);
				more = resultsJson.summary.page_count == 100;
			} while (more);
			spacescanResults = cats;
			console.info(`spacescanGetCatsApi: Fetched and cached ${spacescanResults.length} cats.`);
		}
	}
	catch (error) {
		console.error(`spacescanGetCatsApi: ${error}`);
	}
	return spacescanResults;
};
module.exports.spacescanGetCatsApi = spacescanGetCatsApi;