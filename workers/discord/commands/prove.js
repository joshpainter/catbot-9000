const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { get_tails } = require('../../../api_clients/tailDatabaseClient');
const { configureCatEmbed } = require('../templates/configureCatEmbeds');
const { getDadJoke } = require('../../../api_clients/iCanHazDadJokeClient');
const _ = require('lodash');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prove')
		.setDescription('Proof of Coin - use offer files to prove coin ownership.')
		.addStringOption(option => option
			.setName('cat')
			.setDescription('Enter the TAIL or symbol of the CAT (e.g. CATMOS)')
			.setAutocomplete(true)
			.setRequired(true)),
	async execute(interaction) {
		const cat = interaction.options.getString('cat');
		console.info(`/prove cat ${cat}`);
		const catDetails = await get_tails();
		let filteredCats = _.filter(catDetails.tails, tailItem => tailItem.hash.toLowerCase() == cat.toLowerCase());
		if (!filteredCats.length) {
			filteredCats = _.filter(catDetails.tails, tailItem => tailItem.code.toLowerCase() == cat.toLowerCase());
		}
		if (filteredCats.length != 1) {
			const dadJoke = await getDadJoke();
			await interaction.reply(`Couldn't find exact match for \`\`${cat}\`\`, sorry! Would a joke cheer you up? Yeah? Ok! ${dadJoke.joke}`);
		}
		else {
			const catEmbeds = new Array();
			const components = new Array();

			const selectedCat = filteredCats[0];

			const catEmbed = new MessageEmbed();
			await configureCatEmbed(catEmbed, selectedCat);
			catEmbeds.push(catEmbed);

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setStyle('SUCCESS')
						.setCustomId(JSON.stringify({
							id: 'prove',
							confirm: true,
							cat: selectedCat.code,
						}))
						.setLabel('Yes'),
					new MessageButton()
						.setStyle('DANGER')
						.setCustomId(JSON.stringify({
							id: 'prove',
							confirm: false,
							cat: selectedCat.code,
						}))
						.setLabel('No'),
				);

			components.push(row);

			await interaction.reply({ content:'Is this the correct CAT?', embeds:catEmbeds, components:components });
		}
	},
};