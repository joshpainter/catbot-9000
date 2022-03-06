const fetch = import('node-fetch');
const _ = require('lodash');
const spacescanGetCatsApi = async () => {
	console.info('spacescanGetCatsApi: Fetching results...');
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
		cats = _.union(cats, resultsJson.cats);
		more = resultsJson.summary.page_count == 100;
	} while (more);
	console.info(`spacescanGetCatsApi: Fetched ${cats.length} cats.`);
	return cats;
};
module.exports.spacescanGetCatsApi = spacescanGetCatsApi;