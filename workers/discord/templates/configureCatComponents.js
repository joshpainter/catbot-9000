const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'configureCatComponents',
	async configureCatComponents(interaction, selectedToken) {
		const linksRow = new MessageActionRow();
		if (selectedToken.websiteUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.websiteUrl)
					.setLabel('Website'),
			);
		}
		if (selectedToken.discordUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.discordUrl)
					.setLabel('Discord'),
			);
		}
		if (selectedToken.twitterUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.twitterUrl)
					.setLabel('Twitter'),
			);
		}
		if (selectedToken.facebookUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.facebookUrl)
					.setLabel('Facebook'),
			);
		}
		if (selectedToken.redditUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.redditUrl)
					.setLabel('Reddit'),
			);
		}
		if (selectedToken.telegramUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.telegramUrl)
					.setLabel('Telegram'),
			);
		}
		if (selectedToken.needsSpacescanUpdate) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.spacescan.io/xch/catInfo?asset_id=${selectedToken.tail}`)
					.setLabel('Update details at spacescan.io'),
			);
		}
		return linksRow.components.length ? [linksRow] : [];
	},
};