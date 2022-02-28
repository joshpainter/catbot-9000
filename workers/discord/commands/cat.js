const { SlashCommandBuilder } = require('@discordjs/builders');
const { get_tails } = require('../../../api_clients/tail-database-client');
const { configureCatEmbeds } = require('../templates/configureCatEmbeds');
const { getDadJoke } = require('../../../api_clients/icanhazdadjoke-client');
const { tokenController } = require('../../../controllers/tokenController');
const { configureCatComponents } = require('../templates/configureCatComponents');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Replies with details about a CAT.')
		.addStringOption(option => option
			.setName('search')
			.setDescription('Enter the TAIL, symbol or name of the CAT (e.g. CATMOS)')
			.setAutocomplete(true)
			.setRequired(true)),
	async execute(interaction) {
		const query = interaction.options.getString('search');
		console.info(`/cat search ${query}`);
		const catDetails = await get_tails();

		const tc = new tokenController();
		const tokens = await tc.search(query);

		if (!tokens.length) {
			const dadJoke = await getDadJoke();
			await interaction.reply(`Couldn't find \`\`${query}\`\`, sorry! Would a joke cheer you up? Yeah? Ok! ${dadJoke.joke}`);
		}
		else {
			const selectedToken = tokens[0];
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
								search: query,
								symbol: token.symbol,
							}),
						},
					]);
					counter++;
					if (counter >= 25) break;
				}
				catComponents.push(row);
			}

			await interaction.reply({
				content:`Sifting through ${catDetails.length} CATS to find \`\`${query}\`\`, one sec...`,
				embeds:catEmbeds,
				components:catComponents,
			});
		}
	},
};