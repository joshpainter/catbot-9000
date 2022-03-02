const { TokenController } = require('./TokenController');

test('fetches tokens using TokenController', async () => {
	const tc = new TokenController();
	const tokens = await tc.fetch();
	expect(tokens.length).toBeGreaterThan(0);
});

test('fetches CATMOS token using TokenController.fetch()', async () => {
	const tc = new TokenController();
	const tokens = await tc.fetch();
	const catmos = tokens.filter(token => token.symbol == 'CATMOS')[0];
	expect(catmos.Name).toBe('Catmosphere');
});

test('searches for CATMOS token using TokenController.search()', async () => {
	const tc = new TokenController();
	const tokens = await tc.search('CATMOS');
	expect(tokens[0].Name).toBe('Catmosphere');
});