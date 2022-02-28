const { spacescanGetCatsApi } = require('./spacescanClient');
jest.setTimeout(10000);

test('fetches spacescanGetCatsApi', async () => {
	const spacescanApiResults = await spacescanGetCatsApi();
	expect(spacescanApiResults.length).toBeGreaterThan(0);
});
