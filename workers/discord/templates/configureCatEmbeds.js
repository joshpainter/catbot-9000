const { MessageEmbed } = require('discord.js');
const { getCachedTokensLastUpdated } = require('../../../controllers/tokenController');
module.exports = {
	name: 'configureCatEmbeds',
	async configureCatEmbeds(interaction, token) {
		const formatCurrencyOptions = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 };
		const formatNumberOptions = { minimumFractionDigits: 0, maximumFractionDigits: 2 };
		const formatDateOptions = { dateStyle: 'medium', timeStyle: 'short' };
		if (interaction.message) {
			await interaction.message.suppressEmbeds(false);
		}
		const embed = new MessageEmbed(interaction.message?.embeds[0]);
		embed
			.setColor('#57c776')
			.setTitle(`${token.name} (${token.symbol})`)
			.setURL(`https://www.taildatabase.com/tail/${token.tail}`)
			.setDescription(token.description ?? 'Unknown')
			.setThumbnail(token.logoUrl)
			.setFooter({ text: `Information aggregated from taildatabase.com, xchtoken.org and spacescan.io as of ${getCachedTokensLastUpdated().toLocaleString(interaction.locale, formatDateOptions)}` })
			// .setTimestamp()
			.setFields([])
			.addField('TAIL', token.tail ?? 'Unknown', false);

		if (token.amountIssued) {
			embed.addField('Amount Issued', token.amountIssued?.toLocaleString(interaction.locale, formatNumberOptions) ?? 'Unknown', true);
		}
		if (token.issuedOn) {
			embed.addField('Issued On', token.issuedOn?.toLocaleString(interaction.locale, formatDateOptions) ?? 'Unknown', true);
		}
		if (token.priceUsd) {
			embed.addField('Price (USD)', `${token.price?.toLocaleString(interaction.locale, formatCurrencyOptions) ?? 'Unknown'}`, true);
		}
		if (token.transactionCount) {
			embed.addField('Total Transactions', `${token.transactionCount?.toLocaleString(interaction.locale, formatNumberOptions) ?? 'Unknown'}`, true);
		}
		if (token.transactionAmount) {
			embed.addField('Total Volume', `${token.transactionAmount?.toLocaleString(interaction.locale, formatNumberOptions) ?? 'Unknown'}`, true);
		}
		return [embed];
	},
};