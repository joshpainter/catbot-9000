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

		if (token.AmountIssued) {
			embed.addField('Amount Issued', token.AmountIssued?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown', true);
		}
		if (token.IssuedOn) {
			embed.addField('Issued On', token.IssuedOn?.toLocaleString(interaction.locale, formatDateOptions) || 'Unknown', true);
		}
		if (token.PriceUsd) {
			embed.addField('Price (USD)', `${token.PriceUsd?.toLocaleString(interaction.locale, formatCurrencyOptions) || 'Unknown'}`, true);
		}
		if (token.PriceXch) {
			embed.addField('Price (XCH)', `${token.PriceXch?.toLocaleString(interaction.locale, formatCurrencyOptions) || 'Unknown'}`, true);
		}
		if (token.TransactionCount) {
			embed.addField('Total Transactions', `${token.TransactionCount?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown'}`, true);
		}
		if (token.TransactionAmount) {
			embed.addField('Total Volume', `${token.TransactionAmount?.toLocaleString(interaction.locale, formatNumberOptions) || 'Unknown'}`, true);
		}
		return [embed];
	},
	logInfo: (interaction, logText) => console.info(`${interaction?.guild?.name}:${module.exports.name}:INFO:> ${logText}`),
};