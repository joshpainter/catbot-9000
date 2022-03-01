const { TokenController } = require('../../../controllers/TokenController');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isAutocomplete()) return;
		const query = interaction.options.getString('search');
		const responses = [];
		if (query?.length >= 1) {
			responses.push({
				name: query,
				value: query,
			});
		}
		if (query?.length >= 3) {
			console.info(`autocompleteInteraction: ${query}`);
			const tc = new TokenController();
			const tokens = await tc.search(query);
			for (const token of tokens) {
				responses.push({
					name: `${token.name} (${token.symbol})`,
					value: token.symbol,
				});
				if (responses.length >= 25) break;
			}
		}
		await interaction.respond(responses);
	},
};