const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { TextInput, Modal } = require('discordjs-modal');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rename-wallets')
		.setDescription('Use the output of your "chia wallet show" command to create CLI commands to easily rename your CATs!'),
	customName: 'RenameWalletsCommand',
	async execute(interaction) {

		// const embeds = [
		// 	new MessageEmbed()
		// 		.setColor('RED')
		// 		.setTitle('Rename CATs in Wallet')
		// 		.setDescription('Use the output of your "chia wallet show" command to create CLI commands to easily rename your CATs!')
		// 		.addField('HOW IT WORKS', 'Run the `chia wallet show` command and paste the results here. Catbot will look up the CATs and reply with commands that you can run to rename the CATs in your wallet with their official symbol!')
		// 		.addField('TIP', 'You can paste the whole result of the command or you can remove the other lines that contain your balances before pasting. Catbot only needs the lines that begin with `WALLET ID...` and other lines will be ignored.')
		// 		.addField('WARNING', 'As always, only use these commands at your own risk after reviewing them!', false),
		// ];

		// const components = [
		// 	new MessageActionRow()
		// 		.addComponents(
		// 			new MessageSelectMenu()
		// 				.setCustomId('rename-wallets-os')
		// 				.addOptions([
		// 					{
		// 						label: 'Windows/Powershell',
		// 						value: 'windows',
		// 					},
		// 				]),
		// 		),
		// ];

		// await interaction.reply({
		// 	content: 'Let\'s get thsoe CATs renamed!',
		// 	embeds: embeds,
		// 	components: components,
		// });

		const modal = new Modal()
			.setCustomId('rename-wallets-modal')
			.setTitle('Rename CAT wallets')
			.addComponents(
				new TextInput()
					.setLabel('Output of `chia wallet show` goes here.')
					.setStyle('Paragraph')
					.setMaxLength(2000)
					.setPlaceholder(`Wallet ID 2 type CAT CAT a2cadb541cb01c67...
Wallet ID 3 type CAT CAT 73f33751aa1bdb79...`)
					.setCustomId('name')
					.setRequired(true),
			);

		interaction.client.modal.send(interaction, modal);

	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
};