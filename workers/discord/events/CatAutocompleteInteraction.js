const { TokenController } = require('../../../controllers/TokenController');
module.exports = {
	name: 'interactionCreate',
	customName: 'CatAutocompleteInteraction',
	async execute(interaction) {
		try {
			if (!interaction.isAutocomplete()) return;
			const query = interaction.options.getString('search') || '';
			const responses = [];
			if (query) {
				responses.push({
					name: query,
					value: query,
				});
			}
			if (query.length >= 3) {
				const tc = new TokenController();
				const tokens = await tc.search(query);
				for (const token of tokens) {
					responses.push({
						name: `${token.name} (${token.symbol})`,
						value: token.symbol,
					});
					if (responses.length >= 25) break;
				}
				console.info(`${interaction.guild.name}:${this.customName}:INFO:search=${query} returning ${responses.length} matches`);
			}
			await interaction.respond(responses);
		}
		catch (error) {
			console.error(`${interaction.guild.name}:${this.customName}:ERROR:${error}`);
		}
	},
};