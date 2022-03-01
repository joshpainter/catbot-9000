module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isButton()) return;
		console.info(`buttonInteraction: ${interaction.customId}`);
		const buttonOptions = JSON.parse(interaction.customId);
		if (buttonOptions.id == 'prove') {

			// const cat = interaction.options.getString('cat');
			console.info(JSON.stringify(buttonOptions));

			// const catDetails = await get_tails();
			// const selectedCats = selected?.code ? catDetails.tails.filter(tailItem => tailItem.code.toLowerCase() == selected.code.toLowerCase()) : catDetails.tails;
			// const selectedCat = selectedCats[0];

			// const catEmbed = interaction.message.embeds[0];
			// await configureCatEmbed(catEmbed, selectedCat);

			// await interaction.update({ content: interaction.message.content, embeds: [catEmbed], components: interaction.components });
		}
	},
};