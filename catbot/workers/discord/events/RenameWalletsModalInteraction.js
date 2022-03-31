const { MessageEmbed } = require('discord.js');
const { TokenController } = require('../../../controllers/TokenController');

module.exports = {
	name: 'modal',
	customName: 'RenameWalletsModalInteraction',
	async execute(interaction) {
		try {
			const customId = interaction.customId;
			this.logInfo(interaction, `customId = ${customId}`);
			if (customId == 'rename-wallets-modal') {

				const commandText = interaction.fields[0].value;
				const commands = commandText.split(/\r?\n/);

				const shortTails = new Array();
				for (const command of commands) {
					const findText = 'CAT CAT';
					if (command.indexOf(findText) > 0) {
						const foundIndex = command.indexOf(findText);
						const shortTail = command.substring(foundIndex + findText.length + 1, command.length - 3);
						shortTails.push(shortTail);
					}
				}

				const baseRenameCommand = '.\\Chia.exe wallet add_token -id {tail} -n \'{name}\'\n';
				let renameCommand = '';
				for (const shortTail of shortTails) {
					this.logInfo(interaction, `shortTail=${shortTail}`);
					const tc = new TokenController();
					const token = await tc.findByShortTail(shortTail);
					if (token && token.Symbol != 'UNKNOWN') {
						renameCommand += baseRenameCommand.replace('{tail}', token.Tail).replace('{name}', `${token.Symbol} - ${token.Name}`);
					}
					if (renameCommand.length > 900) break;
				}

				if (!renameCommand) {
					renameCommand = 'No unnamed CATs found.';
				}
				else {
					renameCommand = '`' + renameCommand + '`';
				}
				await interaction.deferReply();
				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle('Rename wallets commands')
					.addField('Commands', renameCommand);
				await interaction.editReply({ embeds:[embed] });

			}
		}
		catch (error) {
			this.logError(interaction, error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.customName}:INFO:> ${logText}`),
	logError: (interaction, error) => console.error(`${interaction?.guild?.name}:${module.exports.customName}:ERROR:> ${error}`),
};