const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'configureCatComponents',
	async configureCatComponents(interaction, selectedToken) {
		const components = new Array();
		const socialLinksRow = new MessageActionRow();
		if (selectedToken.websiteUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.websiteUrl)
					.setEmoji('<:website:947778311877197844>')
					.setLabel('Website'),
			);
		}
		if (selectedToken.discordUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.discordUrl)
					.setEmoji('<:discord:947777859932545044>')
					.setLabel('Discord'),
			);
		}
		if (selectedToken.twitterUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.twitterUrl)
					.setEmoji('<:twitter:947777747458080788>')
					.setLabel('Twitter'),
			);
		}
		if (selectedToken.facebookUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.facebookUrl)
					.setEmoji('<:facebook:947777485116956763>')
					.setLabel('Facebook'),
			);
		}
		if (selectedToken.redditUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.redditUrl)
					.setEmoji('<:reddit:947778704778625054>')
					.setLabel('Reddit'),
			);
		}
		if (selectedToken.telegramUrl) {
			socialLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.telegramUrl)
					.setEmoji('<:telegram:947778739075448863>')
					.setLabel('Telegram'),
			);
		}
		if (socialLinksRow.components.length) {
			components.push(socialLinksRow);
		}
		const catApiLinksRow = new MessageActionRow();
		if (selectedToken.importedFromTailDatabase) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.taildatabase.com/tail/${selectedToken.tail}`)
					.setEmoji('<:taildb:947824406284083320>')
					.setLabel('taildatabase.com'),
			);
		}
		if (selectedToken.importedFromXchToken) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://xchtoken.org/asset_token.php?ASSET_ID=${selectedToken.tail}`)
					.setEmoji('<:xchtoken:947823964904882257>')
					.setLabel('xchtoken.org'),
			);
		}
		if (selectedToken.importedFromSpacescan) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.spacescan.io/xch/cat1/${selectedToken.tail}`)
					.setEmoji('<:spacescan:947781625431863306>')
					.setLabel('spacescan.io'),
			);
		}
		components.push(catApiLinksRow);
		return components;
	},
};