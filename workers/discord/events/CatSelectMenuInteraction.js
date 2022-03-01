const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { TokenController } = require('../../../controllers/TokenController');
const { CatConfigureComponents } = require('../templates/CatConfigureComponents');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		try {
			if (!interaction.isSelectMenu()) return;
			console.info(`selectMenuInteraction: ${interaction.customId}`);
			if (interaction.customId == 'select-cat') {
				const selected = JSON.parse(interaction.values[0]);
				const tc = new TokenController();
				const tokens = await tc.search(selected.search);
				const selectedToken = await tc.findByTail(selected.tail);
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
								// description: token.tail,
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
			console.error(`selectMenuInteraction:ERROR:${error}`);
		}
	},
};