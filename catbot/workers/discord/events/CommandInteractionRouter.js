module.exports = {
	name: 'interactionCreate',
	customName: 'CommandInteractionRouter',
	async execute(interaction) {
		try {
			if (!interaction.isCommand()) return;
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			this.logInfo(interaction, `commandName=${interaction.commandName}`);
			await command.execute(interaction);
		}
		catch (error) {
			this.logError(interaction, error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction?.guild?.name}:${module.exports.customName}:ERROR:> ${error}`),
};