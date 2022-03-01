const { SlashCommandBuilder } = require('@discordjs/builders');
const { CatConfigureEmbeds } = require('../templates/CatConfigureEmbeds');
const { getDadJoke } = require('../../../api-clients/ICanHazDadJokeClient');
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
	customName: 'CatCommand',
	async execute(interaction) {
		const query = interaction.options.getString('search');
		this.logInfo(interaction, `search=${query}`);
		const tc = new TokenController();
		const allTokens = await tc.fetch();
		const tokens = await tc.search(query);
		this.logInfo(interaction, `found ${tokens.length} matches for ${query}`);
		if (!tokens.length) {
			const dadJoke = await getDadJoke();
			await interaction.reply(`Couldn't find \`\`${query}\`\`, sorry! Would a joke cheer you up? Yeah? Ok! ${dadJoke.joke}`);
			this.logInfo(interaction, 'told a (probably terrible) dad joke');
		}
		else {
			const selectedToken = tokens.shift();
			const catEmbeds = await CatConfigureEmbeds(interaction, selectedToken);
			const catComponents = await CatConfigureComponents(interaction, selectedToken);
			if (tokens.length > 1) {
				const selectMenu = new MessageSelectMenu()
					.setCustomId('select-cat')
					.setPlaceholder(`${tokens.length} more results${tokens.length > 25 ? ', only first 25 shown' : ''}...`);
				for (const token of tokens) {
					selectMenu.addOptions([
						{
							label: `${token.name} (${token.symbol})`,
							// description: token.tail,
							value: JSON.stringify({
								search: query,
								tail: token.tail,
							}),
						},
					]);
					if (selectMenu.options.length >= 25) break;
				}
				catComponents.push(new MessageActionRow().addComponents(selectMenu));
			}
			await interaction.reply({
				content:`Sifting through ${allTokens.length} CATS to find \`\`${query}\`\`, one sec...`,
				embeds:catEmbeds,
				components:catComponents,
			});
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
};