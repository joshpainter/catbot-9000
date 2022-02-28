const fetch = import('node-fetch');
const tailDatabaseGetTails = async () => {
	try {
		console.info('get_tails: Fetching results...');
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
		console.info(`get_tails: Fetched ${resultsJson.tails.length} tokens.`);
		return resultsJson.tails;
	}
	catch (error) {
		console.error(`tailDatabaseGetTails: ${error}`);
		throw error;
	}
};
module.exports.tailDatabaseGetTails = tailDatabaseGetTails;