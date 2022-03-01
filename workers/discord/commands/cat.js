const { SlashCommandBuilder } = require('@discordjs/builders');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
const { getDadJoke } = require('../../../api_clients/ICanHazDadJokeClient');
const { TokenController } = require('../../../controllers/TokenController');
const { CatConfigureComponents } = require('../templates/CatConfigureComponents');
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
		const tc = new TokenController();
		const allTokens = await tc.fetch();
		const tokens = await tc.search(query);
		if (!tokens.length) {
			const dadJoke = await getDadJoke();
			await interaction.reply(`Couldn't find \`\`${query}\`\`, sorry! Would a joke cheer you up? Yeah? Ok! ${dadJoke.joke}`);
		}
		else {
			const selectedToken = tokens[0];
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
				content:`Sifting through ${allTokens.length} CATS to find \`\`${query}\`\`, one sec...`,
				embeds:catEmbeds,
				components:catComponents,
			});
		}
	},
};