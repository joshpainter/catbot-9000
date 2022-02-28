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
					.setEmoji('<:website:947778311877197844>')
					.setLabel('Website'),
			);
		}
		if (selectedToken.discordUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.discordUrl)
					.setEmoji('<:discord:947777859932545044>')
					.setLabel('Discord'),
			);
		}
		if (selectedToken.twitterUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.twitterUrl)
					.setEmoji('<:twitter:947777747458080788>')
					.setLabel('Twitter'),
			);
		}
		if (selectedToken.facebookUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.facebookUrl)
					.setEmoji('<:facebook:947777485116956763>')
					.setLabel('Facebook'),
			);
		}
		if (selectedToken.redditUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.redditUrl)
					.setEmoji('<:reddit:947778704778625054>')
					.setLabel('Reddit'),
			);
		}
		if (selectedToken.telegramUrl?.length) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.telegramUrl)
					.setEmoji('<:telegram:947778739075448863>')
					.setLabel('Telegram'),
			);
		}
		if (selectedToken.needsSpacescanUpdate) {
			linksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.spacescan.io/xch/catInfo?asset_id=${selectedToken.tail}`)
					.setEmoji('<:spacescan:947781625431863306>')
					.setLabel('Update details at spacescan.io'),
			);
		}
		return linksRow.components.length ? [linksRow] : [];
	},
};