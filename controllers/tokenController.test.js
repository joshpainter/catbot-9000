const { tokenController } = require('./tokenController');

test('fetches tokens using tokenController', async () => {
	const tc = new tokenController();
	const tokens = await tc.fetch();
	expect(tokens.length).toBeGreaterThan(0);
});

test('fetches CATMOS token using tokenController.fetch()', async () => {
	const tc = new tokenController();
	const tokens = await tc.fetch();
	const catmos = tokens.filter(token => token.symbol == 'CATMOS')[0];
	expect(catmos.name).toBe('Catmosphere');
});

test('searches for CATMOS token using tokenController.search()', async () => {
	const tc = new tokenController();
	const tokens = await tc.search('CATMOS');
	expect(tokens[0].name).toBe('Catmosphere');
});