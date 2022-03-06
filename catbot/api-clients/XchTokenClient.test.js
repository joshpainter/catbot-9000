const { xchtokenGetTokenApi } = require('./xchtoken-client');

test('fetches xchtokenGetTokenApi', async () => {
	const xchtokenGetTokenApiResults = await xchtokenGetTokenApi();
	expect(xchtokenGetTokenApiResults.length).toBeGreaterThan(0);
});