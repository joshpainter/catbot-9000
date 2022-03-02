// const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { TokenController } = require('../../../controllers/TokenController');
const { CatConfigureComponents } = require('../templates/CatConfigureComponents');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
module.exports = {
	name: 'interactionCreate',
	customName: 'CatSelectMenuInteraction',
	async execute(interaction) {
		try {
			if (!interaction.isSelectMenu()) return;
			this.logInfo(interaction, `customId=${interaction.customId}`);
			if (interaction.customId == 'select-cat') {
				const selectedTail = interaction.values[0];
				const tc = new TokenController();
				const selectedToken = await tc.findByTail(selectedTail);
				if (!selectedToken) throw `Couldn't find token for tail '${selectedTail}'`;
				this.logInfo(interaction, `search for ${selectedTail} found ${selectedToken.Symbol}`);
				const catEmbeds = await CatConfigureEmbeds(interaction, selectedToken);
				const catComponents = await CatConfigureComponents(interaction, selectedToken);
				const selectMenuComponent = interaction.message.components.pop();
				catComponents.push(selectMenuComponent);

				await interaction.update({ content: interaction.message.content, embeds: catEmbeds, components: catComponents });
				Promise.all(selectedToken.DescriptionEmojis.map(emoji => interaction.message.react(emoji).catch(() => console.error(`emoji ${emoji} not found`))));

			}
		}
		catch (error) {
			this.logError(interaction, error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:${interaction?.customId}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction?.guild?.name}:${module.exports.customName}:${interaction?.customId}:ERROR:> ${error}`),
};