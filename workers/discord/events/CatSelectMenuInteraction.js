const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { TokenController } = require('../../../controllers/TokenController');
const { CatConfigureComponents } = require('../templates/CatConfigureComponents');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
module.exports = {
	name: 'interactionCreate',
	customName: 'CatSelectMenuInteraction',
	async execute(interaction) {
		try {
			if (!interaction.isSelectMenu()) return;
			if (interaction.customId == 'select-cat') {
				const selected = JSON.parse(interaction.values[0]);
				const tc = new TokenController();
				const selectedToken = await tc.findByTail(selected.tail);
				this.logInfo(interaction, `selected token is ${selectedToken.name}`);
				const tokens = await tc.search(selected.search);
				this.logInfo(interaction, `search for ${selected.search} found ${tokens.length} tokens`);
				const catEmbeds = await CatConfigureEmbeds(interaction, selectedToken);
				const catComponents = await CatConfigureComponents(interaction, selectedToken);
				if (tokens.length > 1) {
					const row = new MessageActionRow()
						.addComponents(
							new MessageSelectMenu()
								.setCustomId('select-cat')
								.setPlaceholder(`${tokens.length} more results${tokens.length >= 27 ? ', only first 25 shown' : ''}...`),
						);
					let counter = 0;
					for (const token of tokens) {
						row.components[0].addOptions([
							{
								label: `${token.name} (${token.symbol})`,
								value: JSON.stringify({
									search: selected.search,
									tail: token.tail,
								}),
							},
						]);
						counter++;
						if (counter >= 25) break;
					}
					catComponents.push(row);
				}
				await interaction.update({ content: interaction.message.content, embeds: catEmbeds, components: catComponents });
			}
		}
		catch (error) {
			this.logError(interaction, error);
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:${interaction?.customId}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction?.guild?.name}:${module.exports.customName}:${interaction?.customId}:ERROR:> ${error}`),
};