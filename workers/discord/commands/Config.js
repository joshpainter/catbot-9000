const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configuration commands for catbot-9000')
		.addSubcommandGroup(
			group => group
				.setName('check')
				.setDescription('Check catbot-9000\'s configuration and functionality')
				.addSubcommand(
					command => command
						.setName('permissions')
						.setDescription('Check catbot-9000\'s permissions configuration')
						.addChannelOption(channel => channel
							.setName('channel')
							.setDescription('The channel for which permissions should be checked. Uses current channel if left blank'))))
		.addSubcommandGroup(
			group => group
				.setName('setup')
				.setDescription('Configure catbot-9000 using step-by-step guides')
				.addSubcommand(
					command => command
						.setName('all')
						.setDescription('Guided setup of all catbot-9000 functionality'))
				.addSubcommand(
					command => command
						.setName('permissions')
						.setDescription('Guided setup of permissions needed for catbot-9000'))),
	customName: 'ConfigCommand',
	async execute(interaction) {
		await interaction.reply({ content:'Under construction', ephemeral: true });
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
};