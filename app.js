require('dotenv').config();

const { tokenController } = require('./controllers/tokenController');
const { startDiscordBot } = require('./workers/discord/discord');
const { startMarketMaker } = require('./workers/market-maker/market-maker');

const refreshTokenCache = async () => {
	const tc = new tokenController();
	tc.fetch(true);
};

const start = async () => {
	await startMarketMaker();
	await refreshTokenCache();

	setInterval(startMarketMaker, process.env.ORDER_CHECK_INTERVAL * 1000);
	setInterval(refreshTokenCache, process.env.TOKEN_CACHE_LIFETIME * 1000);

	await startDiscordBot();
};

start();