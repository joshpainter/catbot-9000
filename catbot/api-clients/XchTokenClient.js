const fetch = import('node-fetch');
const xchtokenGetTokenApi = async () => {
	console.info('xchtokenGetTokenApi: Fetching results...');
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
	const resultsJson = await results.json();
	console.info(`xchtokenGetTokenApi: Fetched ${resultsJson.data.length} tokens.`);
	return resultsJson.data;
};
module.exports.xchtokenGetTokenApi = xchtokenGetTokenApi;