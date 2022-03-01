const { MessageEmbed } = require('discord.js');
const { getOfferSummary, getOfferValidity } = require('../../../api_clients/ChiaWalletRpcClient');
const { OfferConfigureEmbeds } = require('../templates/OfferConfigureEmbeds');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		if (message.attachments.size == 0) return;
		const attachment = message.attachments.first();
		if (attachment.url.substring(attachment.url.length - 6) != '.offer') return;
		console.log('messageCreate: Offer File upload');
		const request = require('request');
		request(attachment.url, async function(error, response, body) {

			const offer = body;

			const offerValidResult = await getOfferValidity(offer);
			const offerSummaryResult = await getOfferSummary(offer);

			const member = message.mentions.members.first() || message.member;

			const offerEmbed = await OfferConfigureEmbeds(message, new MessageEmbed(), offerValidResult, offerSummaryResult);
			offerEmbed.setAuthor({ name:member.user.tag, iconURL:member.user.avatarURL() });

			message.reply({ content:'An offer file :seedling: eh? Let\'s see what we\'ve got...', embeds:[offerEmbed] });

		});
	},
};