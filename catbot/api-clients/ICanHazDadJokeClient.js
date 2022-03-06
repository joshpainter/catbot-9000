const fetch = import('node-fetch');

const getDadJoke = async () => {
	const f = await fetch;
	const results = await f.default(
		`${process.env.ICANHAZDADJOKE_API_URL}/`,
		{
			method: 'get',
			headers: { 'Accept': 'application/json' },
		},
	);
	return await results.json();
};
module.exports.getDadJoke = getDadJoke;