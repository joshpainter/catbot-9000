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
			const selectedToken = tokens[0];
			const catEmbeds = await CatConfigureEmbeds(interaction, selectedToken);
			const catComponents = await CatConfigureComponents(interaction, selectedToken);
			if (tokens.length > 1) {
				const selectMenu = new MessageSelectMenu()
					.setCustomId('select-cat')
					.setPlaceholder(`${tokens.length} results for '${query}' ${tokens.length > 25 ? ', only first 25 shown' : ''}...`);
				for (const token of tokens) {
					selectMenu.addOptions([
						{
							label: token.DisplayName.length > 100 ? `${token.DisplayName.substring(0, 97)}...` : token.DisplayName,
							description: token.Description.length > 100 ? `${token.Description.substring(0, 97)}...` : token.Description,
							value: token.Tail.length > 100 ? `${token.Tail.substring(0, 97)}...` : token.Tail,
						},
					]);
					if (selectMenu.options.length >= 25) break;
				}
				catComponents.push(new MessageActionRow().addComponents(selectMenu));
			}
			await interaction.reply({
				content:`Sifted through ${allTokens.length} CATS looking for '${query}' and found ${tokens.length > 1 ? `${tokens.length} results! Use the menu below to see the other results.\n〰〰〰〰\n:scream_cat: :1234: :face_with_monocle:` : 'exactly one result!\n\n:heart_eyes_cat: :dart: :eyes:'} :point_down:\n〰〰〰〰`,
				embeds:catEmbeds,
				components:catComponents,
			});
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
};