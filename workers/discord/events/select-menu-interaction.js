const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { tokenController } = require('../../../controllers/tokenController');
const { configureCatComponents } = require('../templates/configureCatComponents');
const { configureCatEmbeds } = require('../templates/configureCatEmbeds');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isSelectMenu()) return;
		console.info(`selectMenuInteraction: ${interaction.customId}`);
		if (interaction.customId == 'select-cat') {
			const selected = JSON.parse(interaction.values[0]);
			const tc = new tokenController();
			const tokens = await tc.search(selected.search);
			const selectedTokens = await tc.search(selected.symbol);
			const selectedToken = selectedTokens[0];

			const catEmbeds = await configureCatEmbeds(interaction, selectedToken);
			const catComponents = await configureCatComponents(interaction, selectedToken);
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
							description: null,
							value: JSON.stringify({
								search: selected.search,
								symbol: token.symbol,
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
	},
};