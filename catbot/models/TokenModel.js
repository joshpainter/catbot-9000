const _ = require('lodash');
const emojifier = require('moji-translate');
class TokenModel {
	mergeTailDatabaseData(tailDatabaseData) {
		this.tailDatabaseData = tailDatabaseData;
		if (tailDatabaseData) {
			this.importedFromTailDatabaseOn = new Date();
			this.dataIsCleanForTailDatabase = tailDatabaseData.code?.length > 0;
		}
	}
	mergeXchTokenData(xchTokenData) {
		this.xchTokenData = xchTokenData;
		if (xchTokenData) {
			this.importedFromXchTokenOn = new Date();
			this.dataIsCleanForXchToken = xchTokenData.Symbol?.length > 0;
		}
	}
	mergeSpacescanData(spacescanData) {
		this.spacescanData = spacescanData;
		if (spacescanData) {
			this.importedFromSpacescanOn = new Date();
			this.dataIsCleanForSpacescan = spacescanData.symbol?.length > 0;
		}
	}
	get DisplayName() {
		return `${this.Name} (${this.Symbol})`;
	}
	get Name() {
		return this.spacescanData?.asset_name || this.xchTokenData?.Name || this.tailDatabaseData?.name;
	}
	get Tail() {
		return this.spacescanData?.asset_id || this.xchTokenData?.ASSET_ID || this.tailDatabaseData?.hash;
	}
	get Symbol() {
		return this.spacescanData?.symbol || this.xchTokenData?.Symbol || this.tailDatabaseData?.code;
	}
	get LogoUrl() {
		let logoUrl = '';
		if (this.spacescanData?.logo && this.spacescanData?.logo != 'https://images.spacescan.io/xch/cat/default_logo.png') {
			logoUrl = this.spacescanData.logo;
		}
		if (!logoUrl || (!logoUrl.toLowerCase().endsWith('.gif') && this.xchTokenData?.ImageUrl?.toLowerCase().endsWith('.gif'))) {
			logoUrl = this.xchTokenData?.ImageUrl;
		}
		if (!logoUrl || (!logoUrl.toLowerCase().endsWith('.gif') && this.tailDatabaseData?.logo_url?.toLowerCase().endsWith('.gif'))) {
			logoUrl = this.tailDatabaseData.logo_url;
		}
		return logoUrl;
	}
	get Description() {
		return this.spacescanData?.description || this.xchTokenData?.Introduction || this.tailDatabaseData?.description;
	}
	get DescriptionEmojis() {
		const emojis = Array.from(emojifier.translate(this.Description, true)).filter(emoji => emojifier.isMaybeAlreadyAnEmoji(emoji));
		return _.uniq(emojis);
	}
	get AmountIssued() {
		return this.spacescanData.total_supply || (typeof this.xchTokenData?.Amount == 'number' ? this.xchTokenData.Amount / 1000 : _.toNumber(this.xchTokenData?.Amount)) || this.tailDatabaseData.supply;
	}
	get ChiaLisp() {
		return this.spacescanData.lisp || this.tailDatabaseData.chialisp;
	}
	get Clvm() {
		return this.spacescanData.clvm || this.tailDatabaseData.clvm;
	}
	get IssuedOn() {
		return this.spacescanData.issued_time || (this.xchTokenData?.CreateTime ? new Date(_.toNumber(this.xchTokenData.CreateTime) * 1000) : null);
	}
	get IssuedHeight() {
		return this.xchTokenData?.Height;
	}
	get DiscordUrl() {
		return this.spacescanData.discord?.startsWith('http') ? this.spacescanData.discord : this.xchTokenData?.Discord?.startsWith('http') ? this.xchTokenData.Discord : null;
	}
	get FacebookUrl() {
		return this.xchTokenData?.Facebook?.startsWith('http') ? this.xchTokenData.Facebook : null;
	}
	get RedditUrl() {
		return this.spacescanData.reddit?.startsWith('http') ? this.spacescanData.reddit : this.xchTokenData?.Reddit?.startsWith('http') ? this.xchTokenData.Reddit : null;
	}
	get TelegramUrl() {
		return this.xchTokenData?.Telegram?.startsWith('http') ? this.xchTokenData.Telegram : null;
	}
	get TwitterUrl() {
		return this.spacescanData.twitter?.startsWith('http') ? this.spacescanData.twitter : this.xchTokenData?.Twitter?.startsWith('http') ? this.xchTokenData.Twitter : null;
	}
	get WebsiteUrl() {
		return this.xchTokenData?.Website?.startsWith('http') ? this.xchTokenData.Website : null;
	}
	get WhitepaperUrl() {
		return this.spacescanData.whitepaper?.startsWith('http') ? this.spacescanData.website : null;
	}
	get PriceUsd() {
		return this.spacescanData.price_usd;
	}
	get PriceXch() {
		return this.spacescanData.price_xch;
	}
	get ImportedOn() {
		return new Date(Math.max(this.importedFromTailDatabaseOn, this.importedFromXchTokenOn, this.importedFromSpacescanOn));
	}
	get Holders() {
		return this.spacescanData.holders;
	}
	get Tags() {
		return this.spacescanData.tags;
	}
	get TransactionCount() {
		return this.spacescanData.txns_count;
	}
	get TransactionAmount() {
		return this.spacescanData.txns_amount;
	}
	get ApisMissingDetails() {
		const apisMissingDetails = new Array();
		if (!this.dataIsCleanForTailDatabase) apisMissingDetails.push('taildatabase');
		if (!this.dataIsCleanForXchToken) apisMissingDetails.push('xchtoken');
		if (!this.dataIsCleanForSpacescan) apisMissingDetails.push('spacescan');
		return apisMissingDetails;
	}
}
module.exports.TokenModel = TokenModel;