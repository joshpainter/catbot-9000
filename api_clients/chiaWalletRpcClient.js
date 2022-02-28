const fs = require('fs');
const path = require('path');
const https = require('https');
const fetch = import('node-fetch');

const options = {
	cert: fs.readFileSync(
		path.resolve(process.env.CHIA_SSL_DIR, './private_wallet.crt'),
		'utf-8',
	),
	key: fs.readFileSync(
		path.resolve(process.env.CHIA_SSL_DIR, './private_wallet.key'),
		'utf-8',
	),
	rejectUnauthorized: false,
};

const sslConfiguredAgent = new https.Agent(options);

const getOfferSummary = async (offer) => {
	const f = await fetch;
	const summary = await f.default(
		`${process.env.WALLET_RPC_HOST}/get_offer_summary`,
		{
			method: 'post',
			body: JSON.stringify({ offer }),
			headers: { 'Content-Type': 'application/json' },
			agent: sslConfiguredAgent,
		},
	);
	return await summary.json();
};
module.exports.getOfferSummary = getOfferSummary;

const getOfferValidity = async (offer) => {
	const f = await fetch;
	const summary = await f.default(
		`${process.env.WALLET_RPC_HOST}/check_offer_validity`,
		{
			method: 'post',
			body: JSON.stringify({ offer }),
			headers: { 'Content-Type': 'application/json' },
			agent: sslConfiguredAgent,
		},
	);
	return await summary.json();
};
module.exports.getOfferValidity = getOfferValidity;

const catAssetIdToName = async (assetId) => {
	if (assetId == 'xch') return { name: 'XCH' };
	const f = await fetch;
	const response = await f.default(
		`${process.env.WALLET_RPC_HOST}/cat_asset_id_to_name`,
		{
			method: 'post',
			body: `{"asset_id": "${assetId}"}`,
			headers: { 'Content-Type': 'application/json' },
			agent: sslConfiguredAgent,
		},
	);
	return await response.json();
};
module.exports.catAssetIdToName = catAssetIdToName;

const createOffer = async (offer) => {
	const f = await fetch;
	const summary = await f.default(
		`${process.env.WALLET_RPC_HOST}/create_offer_for_ids`,
		{
			method: 'post',
			body: JSON.stringify({ offer }),
			headers: { 'Content-Type': 'application/json' },
			agent: sslConfiguredAgent,
		},
	);
	return await summary.json();
};
module.exports.createOffer = createOffer;