const _ = require('lodash');
class TokenModel {
	constructor() {
		this.name = 'Chia';
		this.symbol = 'XCH';
		this.tail = '1';
		this.description = 'Digital money for a digital world.';
	}
	mergeTailDatabaseData(tailDatabaseData) {
		if (tailDatabaseData) {
			this.importedFromTailDatabase = true;
			this.name = tailDatabaseData.name;
			this.tail = tailDatabaseData.hash;
			this.symbol = tailDatabaseData.code;
			this.logoUrl = tailDatabaseData.logo_url;
			this.description = tailDatabaseData.description;
			this.amountIssued = tailDatabaseData.supply;
			this.chiaLisp = tailDatabaseData.chialisp;
			this.clvm = tailDatabaseData.clvm;
		}
	}
	mergeXchTokenData(xchTokenData) {
		if (xchTokenData) {
			this.importedFromXchToken = true;
			this.name = xchTokenData.Name || this.name;
			this.tail = xchTokenData.ASSET_ID || this.tail;
			this.symbol = xchTokenData.Symbol || this.symbol;
			this.logoUrl = xchTokenData.TailLogoUrl || xchTokenData.ImageUrl || this.logoUrl;
			this.description = xchTokenData.TailDatabaseDescription || this.description;
			this.amountIssued = typeof xchTokenData.Amount == 'number' ? xchTokenData.Amount / 1000 : _.toNumber(xchTokenData.Amount);
			this.issuedOn = xchTokenData.CreateTime ? new Date(_.toNumber(xchTokenData.CreateTime) * 1000) : this.issuedOn;
			this.issuedHeight = xchTokenData.Height;
			this.discordUrl = xchTokenData.Discord?.startsWith('http') ? xchTokenData.Discord : null;
			this.facebookUrl = xchTokenData.Facebook?.startsWith('http') ? xchTokenData.Facebook : null;
			this.redditUrl = xchTokenData.Reddit?.startsWith('http') ? xchTokenData.Reddit : null;
			this.telegramUrl = xchTokenData.Telegram?.startsWith('http') ? xchTokenData.Telegram : null;
			this.twitterUrl = xchTokenData.Twitter?.startsWith('http') ? xchTokenData.Twitter : null;
			this.websiteUrl = xchTokenData.Website?.startsWith('http') ? xchTokenData.Website : null;
		}
	}
	mergeSpacescanData(spacescanData) {
		if (spacescanData) {
			this.needsSpacescanUpdate = spacescanData.symbol == null;
			if (spacescanData.symbol != null) {
				this.importedFromSpacescan = true;
				this.name = spacescanData.asset_name || this.name;
				this.tail = spacescanData.asset_id || this.tail;
				this.symbol = spacescanData.symbol || this.symbol;
				this.logoUrl = spacescanData.logo || this.logoUrl;
				this.description = spacescanData.description || this.description;
				this.amountIssued = spacescanData.total_supply || this.amountIssued;
				this.issuedOn = spacescanData.issued_time || this.issuedOn;
				this.chiaLisp = spacescanData.lisp || this.chiaLisp;
				this.clvm = spacescanData.clvm || this.clvm;
				this.priceUsd = spacescanData.price_usd;
				this.priceXch = spacescanData.price_xch;
				this.updatedOn = spacescanData.updated;
				this.holders = spacescanData.holders;
				this.tags = spacescanData.tags;
				this.transactionCount = spacescanData.txns_count;
				// this.transactionAmount = spacescanData.txns_amount;
			}
		}
	}
}
module.exports.TokenModel = TokenModel;