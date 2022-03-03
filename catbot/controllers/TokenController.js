const _ = require('lodash');
const { spacescanGetCatsApi } = require('../api-clients/SpacescanClient');
const { tailDatabaseGetTails } = require('../api-clients/TailDatabaseClient');
const { xchtokenGetTokenApi } = require('../api-clients/XchTokenClient');
const { TokenModel } = require('../models/TokenModel');
let cachedTokens = new Array();
let cachedTokensLastUpdated = new Date();
const getCachedTokensLastUpdated = () => cachedTokensLastUpdated;
module.exports.getCachedTokensLastUpdated = getCachedTokensLastUpdated;
class TokenController {
	async fetch(disableCache) {
		try {
			if (!cachedTokens || disableCache) {
				const tokens = new Array();
				const xchToken = new TokenModel();
				xchToken.mergeTailDatabaseData({
					name: 'Chia',
					code: 'XCH',
					hash: 'XCH',
					description: 'Digital money for a digital world.',
				});
				tokens.push(xchToken);
				const tailDbApiResults = await tailDatabaseGetTails();
				tailDbApiResults.forEach(tailDbResult => {
					const token = new TokenModel();
					token.mergeTailDatabaseData(tailDbResult);
					tokens.push(token);
				});
				const xchTokenApiResults = await xchtokenGetTokenApi();
				xchTokenApiResults.forEach(xchTokenApiResult => {
					let token = _.find(tokens, findToken => findToken.Tail?.toLowerCase() == xchTokenApiResult.ASSET_ID?.toLowerCase());
					if (!token) token = _.find(tokens, findToken => findToken.Symbol?.toLowerCase() == xchTokenApiResult.Symbol?.toLowerCase());
					if (!token) {
						token = new TokenModel();
						tokens.push(token);
					}
					token.mergeXchTokenData(xchTokenApiResult);
				});
				const spacescanApiResults = await spacescanGetCatsApi();
				spacescanApiResults.forEach(spacescanApiResult => {
					let token = _.find(tokens, findToken => findToken.Tail?.toLowerCase() == spacescanApiResult.asset_id?.toLowerCase());
					if (!token) {
						token = new TokenModel();
						tokens.push(token);
					}
					token.mergeSpacescanData(spacescanApiResult);
				});
				cachedTokens = tokens;
				cachedTokensLastUpdated = new Date();
			}
		}
		catch (error) {
			console.error(error);
		}
		return cachedTokens;
	}
	async search(query) {
		let tokens = await this.fetch();
		tokens = _.filter(tokens, token => token.Tail);
		let filteredTokens = _.filter(tokens, token => token.Tail?.toLowerCase() == query.toLowerCase());
		filteredTokens = _.unionBy(filteredTokens, _.filter(tokens, token => token.Symbol?.toLowerCase().startsWith(query.toLowerCase())), token => token.Tail.toLowerCase());
		filteredTokens = _.unionBy(filteredTokens, _.filter(tokens, token => token.Description?.toLowerCase().includes(query.toLowerCase()) || token.Name?.toLowerCase().includes(query.toLowerCase())), token => token.Tail);
		return filteredTokens;
	}
	async findByTail(tail) {
		const tokens = await this.fetch();
		const foundToken = _.find(tokens, token => token.Tail?.toLowerCase() == tail?.toLowerCase());
		return foundToken;
	}
}
module.exports.TokenController = TokenController;