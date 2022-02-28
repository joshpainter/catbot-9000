const { get_tail } = require('../../../api_clients/tailDatabaseClient');

module.exports = {
	name: 'configureOfferEmbed',
	async configureOfferEmbed(interaction, embed, offerValidResult, offerSummaryResult) {
		const catMultiplier = 1000;
		const xchMultiplier = 1000000000000;
		const formatNumberOptions = { minimumFractionDigits: 0, maximumFractionDigits: 2 };
		const offerValid = offerValidResult && offerValidResult.success && offerValidResult.valid;
		embed
			.setColor(`${offerValid ? '#57c776' : '#FF0000'}`)
		// .setThumbnail('https://catmosdata.blob.core.windows.net/content/assets/tokens/catmos-token-450.png')
			.setFooter({ text: `Offer is ${offerValid ? '' : 'NOT'} valid as of` })
			.setTimestamp();

		const offered = Object.entries(offerSummaryResult.summary.offered);
		const requested = Object.entries(offerSummaryResult.summary.requested);

		for (let index = 0; index < offered.length || index < requested.length; index++) {
			if (index < requested.length) {
				const requestedCatDetail = await get_tail(requested[index][0]);
				const requestedCatMultiplier = requestedCatDetail.code == 'XCH' ? xchMultiplier : catMultiplier;
				const requestedAmount = requested[index][1] / requestedCatMultiplier;
				embed.addField(':outbox_tray: Requests', `${requestedAmount.toLocaleString(interaction.locale, formatNumberOptions)} ${requestedCatDetail.code}`, true);
			}
			else {
				embed.addField('\u200B', '\u200B');
			}
			if (index < offered.length) {
				const offeredCatDetail = await get_tail(offered[index][0]);
				const offeredCatMultiplier = offeredCatDetail.code == 'XCH' ? xchMultiplier : catMultiplier;
				const offeredAmount = offered[index][1] / offeredCatMultiplier;
				embed.addField('Offers :inbox_tray:', `${offeredAmount.toLocaleString(interaction.locale, formatNumberOptions)} ${offeredCatDetail.code}`, true);
			}
			else {
				embed.addField('\u200B', '\u200B');
			}
		}
		return embed;
	},
};