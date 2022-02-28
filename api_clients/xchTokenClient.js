const fetch = import('node-fetch');

let xchTokenResults = new Array();
let xchTokenResultsLastUpdate = new Date(0);
const xchtokenGetTokenApi = async () => {
	try {
		const now = new Date();
		if (!xchTokenResults || (now - xchTokenResultsLastUpdate > 300 * 1000)) {
			console.info(`xchtokenGetTokenApi: Cache too old (last updated ${xchTokenResultsLastUpdate}). Fetching fresh results...`);
			const f = await fetch;
			const results = await f.default(
				`${process.env.XCHTOKEN_API_URL}`,
				{
					method: 'get',
					headers: {
						'Accept': 'application/json',
					},
				},
			);
			xchTokenResults = (await results.json()).data;
			console.info(`xchtokenGetTokenApi: Fetched and cached ${xchTokenResults.length} tokens.`);
			xchTokenResultsLastUpdate = new Date();
		}
	}
	catch (error) {
		console.error(`xchtokenGetTokenApi: ${error}`);
	}
	return xchTokenResults;
};
module.exports.xchtokenGetTokenApi = xchtokenGetTokenApi;