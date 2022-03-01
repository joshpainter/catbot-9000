const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
const { getDadJoke } = require('../../../api-clients/ICanHazDadJokeClient');
const { TokenController } = require('../../../controllers/TokenController');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('prove')
		.setDescription('Proof of Coin - use offer files to prove coin ownership.')
		.addStringOption(option => option
			.setName('cat')
			.setDescription('Enter the TAIL or symbol of the CAT (e.g. CATMOS)')
			.setAutocomplete(true)
			.setRequired(true)),
	customName: 'ProveCommand',
	async execute(interaction) {
		const cat = interaction.options.getString('cat');
		this.logInfo(interaction, `cat=${cat}`);
		const tc = new TokenController();
		const tokens = await tc.search(cat);
		if (!tokens.length) {
			const dadJoke = await getDadJoke();
			await interaction.reply(`Couldn't find any results for \`\`${cat}\`\`, sorry! Would a joke cheer you up? Yeah? Ok! ${dadJoke.joke}`);
		}
		else {
			const components = new Array();
			const selectedCat = tokens[0];
			const catEmbeds = await CatConfigureEmbeds(interaction, selectedCat);
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setStyle('SUCCESS')
						.setCustomId(JSON.stringify({
							id: 'prove',
							confirm: true,
							symbol: selectedCat.symbol,
						}))
						.setLabel('Yes'),
					new MessageButton()
						.setStyle('DANGER')
						.setCustomId(JSON.stringify({
							id: 'prove',
							confirm: false,
							symbol: selectedCat.symbol,
						}))
						.setLabel('No'),
				);
			components.push(row);
			await interaction.reply({ content:'Is this the correct CAT?', embeds:catEmbeds, components:components });
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
};