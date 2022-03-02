const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'CatConfigureComponents',
	async CatConfigureComponents(interaction, selectedToken) {
		const components = new Array();
		const buttons = new Array();
		if (selectedToken.websiteUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.websiteUrl)
					.setEmoji('<:website:947778311877197844>')
					.setLabel('Website'),
			);
		}
		if (selectedToken.discordUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.discordUrl)
					.setEmoji('<:discord:947777859932545044>')
					.setLabel('Discord'),
			);
		}
		if (selectedToken.twitterUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.twitterUrl)
					.setEmoji('<:twitter:947777747458080788>')
					.setLabel('Twitter'),
			);
		}
		if (selectedToken.facebookUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.facebookUrl)
					.setEmoji('<:facebook:947777485116956763>')
					.setLabel('Facebook'),
			);
		}
		if (selectedToken.redditUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.redditUrl)
					.setEmoji('<:reddit:947778704778625054>')
					.setLabel('Reddit'),
			);
		}
		if (selectedToken.telegramUrl) {
			buttons.push(
				new MessageButton()
					.setStyle('LINK')
					.setURL(selectedToken.telegramUrl)
					.setEmoji('<:telegram:947778739075448863>')
					.setLabel('Telegram'),
			);
		}
		const socialLinksRow1 = new MessageActionRow();
		const socialLinksRow2 = new MessageActionRow();
		for (const button of buttons) {
			if (socialLinksRow1.components.length < 3) {
				socialLinksRow1.addComponents(button);
			}
			else {
				socialLinksRow2.addComponents(button);
			}
		}
		if (socialLinksRow1.components.length) {
			components.push(socialLinksRow1);
		}
		if (socialLinksRow2.components.length) {
			components.push(socialLinksRow2);
		}
		const catApiLinksRow = new MessageActionRow();
		if (selectedToken.importedFromTailDatabaseOn) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.taildatabase.com/tail/${selectedToken.Tail}`)
					.setEmoji('<:taildb:947824406284083320>')
					.setLabel('taildatabase.com'),
			);
		}
		if (selectedToken.importedFromXchTokenOn) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://xchtoken.org/asset_token.php?ASSET_ID=${selectedToken.Tail}`)
					.setEmoji('<:xchtoken:947823964904882257>')
					.setLabel('xchtoken.org'),
			);
		}
		if (selectedToken.importedFromSpacescanOn) {
			catApiLinksRow.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(`https://www.spacescan.io/xch/cat1/${selectedToken.Tail}`)
					.setEmoji('<:spacescan:947781625431863306>')
					.setLabel('spacescan.io'),
			);
		}
		components.push(catApiLinksRow);
		return components;
	},
};