const { TokenController } = require('../../../controllers/TokenController');
module.exports = {
	name: 'interactionCreate',
	customName: 'CatAutocompleteInteraction',
	async execute(interaction) {
		try {
			if (!interaction.isAutocomplete()) return;
			const query = interaction.options.getString('search') || '';
			// this.logInfo(interaction, `searching for '${query}'...`);
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
						name: token.name,
						value: token.name,
					});
					if (responses.length >= 25) break;
				}
				this.logInfo(interaction, `search for '${query}' returned ${tokens.length} matches`);
			}
			await interaction.respond(responses);
		}
		catch (error) {
			this.logError(interaction, error);
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction.guild.name}:${module.exports.customName}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction.guild?.name}:${module.exports.customName}:ERROR:> ${error}`),
};