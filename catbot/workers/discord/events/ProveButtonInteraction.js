module.exports = {
	name: 'interactionCreate',
	customName: 'ProveButtonInteraction',
	async execute(interaction) {
		try {
			if (!interaction.isButton()) return;
			const buttonOptions = JSON.parse(interaction.customId);
			this.logInfo(interaction, `confirm=${buttonOptions.confirm}&cat=${buttonOptions.Symbol}`);
			if (buttonOptions.id == 'prove') {

				// const cat = interaction.options.getString('cat');
				// console.info(JSON.stringify(buttonOptions));

				// const catDetails = await get_tails();
				// const selectedCats = selected?.code ? catDetails.tails.filter(tailItem => tailItem.code.toLowerCase() == selected.code.toLowerCase()) : catDetails.tails;
				// const selectedCat = selectedCats[0];

				// const catEmbed = interaction.message.embeds[0];
				// await configureCatEmbed(catEmbed, selectedCat);

				// await interaction.update({ content: interaction.message.content, embeds: [catEmbed], components: interaction.components });
				await interaction.reply({ content: 'Under construction...', ephemeral: true });
			}
		}
		catch (error) {
			this.logError(interaction, error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction?.guild?.name}:${module.exports.customName}:ERROR:> ${error}`),
};