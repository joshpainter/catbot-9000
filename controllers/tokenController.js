const _ = require('lodash');
const { spacescanGetCatsApi } = require('../api_clients/spacescanClient');
const { get_tails } = require('../api_clients/tail-database-client');
const { xchtokenGetTokenApi } = require('../api_clients/xchTokenClient');
const { tokenModel } = require('../models/tokenModel');
class tokenController {
	async fetch() {
		const tokens = new Array();

		const tailDbApiResults = await get_tails();
		tailDbApiResults.forEach(tailDbResult => {
			const token = new tokenModel();
			token.mergeTailDatabaseData(tailDbResult);
			tokens.push(token);
		});

		const xchTokenApiResults = await xchtokenGetTokenApi();
		xchTokenApiResults.forEach(xchTokenApiResult => {
			let token = _.find(tokens, findToken => findToken.tail == xchTokenApiResult.ASSET_ID);
			if (!token) {
				token = new tokenModel();
				tokens.push(token);
			}
			token.mergeXchTokenData(xchTokenApiResult);
		});

		const spacescanApiResults = await spacescanGetCatsApi();
		spacescanApiResults.forEach(spacescanApiResult => {
			let token = _.find(tokens, findToken => findToken.tail == spacescanApiResult.asset_id);
			if (!token) {
				token = new tokenModel();
				tokens.push(token);
			}
			token.mergeSpacescanData(spacescanApiResult);
		});
		return tokens;
	}
	async search(query) {
		const tokens = await this.fetch();
		let filteredTokens = _.filter(tokens, token => token.tail?.toLowerCase() == query.toLowerCase());
		filteredTokens = _.union(filteredTokens, _.filter(tokens, token => token.symbol?.toLowerCase() == query.toLowerCase()));
		filteredTokens = _.union(filteredTokens, _.filter(tokens, token => token.description?.toLowerCase().includes(query.toLowerCase()) || token.name?.toLowerCase().includes(query.toLowerCase())));
		return filteredTokens;
	}
}
module.exports.tokenController = tokenController;