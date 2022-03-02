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
				tokens.push({
					name: 'Chia',
					symbol: 'XCH',
					tail: 'XCH',
					description: 'Digital money for a digital world.',
				});
				const tailDbApiResults = await tailDatabaseGetTails();
				tailDbApiResults.forEach(tailDbResult => {
					const token = new TokenModel();
					token.mergeTailDatabaseData(tailDbResult);
					tokens.push(token);
				});
				const xchTokenApiResults = await xchtokenGetTokenApi();
				xchTokenApiResults.forEach(xchTokenApiResult => {
					let token = _.find(tokens, findToken => findToken.tail == xchTokenApiResult.ASSET_ID);
					if (!token) {
						token = new TokenModel();
						tokens.push(token);
					}
					token.mergeXchTokenData(xchTokenApiResult);
				});
				const spacescanApiResults = await spacescanGetCatsApi();
				spacescanApiResults.forEach(spacescanApiResult => {
					let token = _.find(tokens, findToken => findToken.tail == spacescanApiResult.asset_id);
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
		tokens = _.filter(tokens, token => token.tail);
		let filteredTokens = _.filter(tokens, token => token.tail?.toLowerCase() == query.toLowerCase());
		filteredTokens = _.unionBy(filteredTokens, _.filter(tokens, token => token.symbol?.toLowerCase().startsWith(query.toLowerCase())), token => token.tail.toLowerCase());
		filteredTokens = _.unionBy(filteredTokens, _.filter(tokens, token => token.description?.toLowerCase().includes(query.toLowerCase()) || token.name?.toLowerCase().includes(query.toLowerCase())), token => token.tail);
		return filteredTokens;
	}
	async findByTail(tail) {
		const tokens = await this.fetch();
		const foundToken = _.find(tokens, token => token.tail?.toLowerCase() == tail?.toLowerCase());
		return foundToken;
	}
}
module.exports.TokenController = TokenController;