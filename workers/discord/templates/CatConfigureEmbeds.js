const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'CatConfigureEmbeds',
	async CatConfigureEmbeds(interaction, token) {
		const formatCurrencyOptions = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 };
		const formatNumberOptions = { minimumFractionDigits: 0, maximumFractionDigits: 2 };
		const formatDateOptions = { dateStyle: 'medium', timeStyle: 'short' };
		if (interaction.message) {
			await interaction.message.suppressEmbeds(false);
		}
		const dataSummary = `Information aggregated from taildatabase.com, xchtoken.org and spacescan.io as of ${token.importedFromTailDatabaseOn?.toLocaleString(interaction.locale, formatDateOptions)}`;
		// let dataSummary = `✅ All sources agree. Information aggregated from taildatabase.com, xchtoken.org and spacescan.io as of ${token.importedFromSpacescanOn.toLocaleString(interaction.locale, formatDateOptions)}`;
		// if (!token.importedFromTailDatabaseOn || !token.importedFromXchTokenOn || !token.importedFromSpacescanOn) {
		// 	dataSummary = `🟥 Sources do not have complete data. Information aggregated from taildatabase.com, xchtoken.org and spacescan.io as of ${token.importedFromSpacescanOn.toLocaleString(interaction.locale, formatDateOptions)}`;
		// }
		const embed = new MessageEmbed();
		embed
			.setColor(token.ApisMissingDetails?.length ? 'YELLOW' : 'GREEN')
			.setTitle(`${token.Name} (${token.Symbol})`)
			.setURL(`https://www.spacescan.io/xch/cat1/${token.Tail}`)
			.setDescription(token.Description ?? 'Unknown')
			.setThumbnail(token.LogoUrl)
			.setFooter({ text: dataSummary })
			.setFields([])
			.addField('TAIL', token.Tail ?? 'Unknown', false);

		if (token.amountIssued) {
			embed.addField('Amount Issued', token.amountIssued?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown', true);
		}
		if (token.issuedOn) {
			embed.addField('Issued On', token.issuedOn?.toLocaleString(interaction.locale, formatDateOptions) || 'Unknown', true);
		}
		if (token.priceUsd) {
			embed.addField('Price (USD)', `${token.price?.toLocaleString(interaction.locale, formatCurrencyOptions) || 'Unknown'}`, true);
		}
		if (token.transactionCount) {
			embed.addField('Total Transactions', `${token.transactionCount?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown'}`, true);
		}
		if (token.transactionAmount) {
			embed.addField('Total Volume', `${token.transactionAmount?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown'}`, true);
		}
		return [embed];
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.name}:INFO:> ${logText}`),
};