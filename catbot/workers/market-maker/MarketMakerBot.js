const { getOrderBook, uploadMyOrder } = require('../../api-clients/HashgreenClient');
// const { getDadJoke } = require('../../../api-clients/ICanHazDadJokeClient');
const { createOffer } = require('../../api-clients/ChiaWalletRpcClient');

const startMarketMaker = async () => {

	// const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

	const xchMultiplier = 1000000000000;
	const catMultiplier = 1000;
	const hg_market_id = process.env.HASHGREEN_MARKET_ID;
	const askPriceCAT = parseFloat(process.env.ASK_PRICE_CAT);
	const askPriceXCH = parseFloat(process.env.ASK_PRICE_XCH);
	const askMinOrders = parseFloat(process.env.ASK_MIN_ORDERS);
	const bidPriceCAT = parseFloat(process.env.BID_PRICE_CAT);
	const bidPriceXCH = parseFloat(process.env.BID_PRICE_XCH);
	const bidMinOrders = parseFloat(process.env.BID_MIN_ORDERS);
	const orderFeeAmount = parseFloat(process.env.ORDER_FEE_AMOUNT) * xchMultiplier;


	// This little bit was used as a countdown timer. The bid/ask price drops every minute until it hits a floor.
	// If you don't want this "feature" then comment out these next few lines.
	// var endTime = new Date(Date.parse("2022-02-16T00:00:00"));
	// const total = Date.parse(endTime) - Date.parse(new Date());
	// const minutes = Math.floor(total / 1000 / 60);
	// askPrice = (minutes + 30);
	// if (askPrice <= 350) askPrice = 350;
	// bidPrice = (minutes + 10);
	// if (bidPrice <= 400) bidPrice = 400;
	// End of countdown timer code


	// Now let's make our first API call - we need to go get the current order book for our CAT and split them
	// into bid/ask arrays so we can work with them. The filter I use here assumes that all under 550 are my
	// existing offers, but even if they aren't that's ok cause the order book is full.
	const openOrders = await getOrderBook(hg_market_id);
	const myAsks = openOrders.data.asks ? openOrders.data.asks.filter(ask => ask[3] == askPriceCAT && ask[4] == askPriceXCH) : new Array();
	const myBids = openOrders.data.bids ? openOrders.data.bids.filter(bid => bid[3] == bidPriceCAT && bid[4] == bidPriceXCH) : new Array();
	console.log(`Woke up and found ${myAsks.length} asks and ${myBids.length} bids...`);
	// End of get order book

	// Now let's put together the offer for either the bid or the ask, depending on which one we need to create.
	// We always want to keep at least 10 orders on both sides of the order book but we only want to create one
	// at a time per ORDER_CHECK_INTERVAL.
	// But first we need to go get a dadjoke of course and we should also send it over to Discord.
	let offer = null;
	if (myAsks.length < askMinOrders) {
		console.log('Creating ask...');
		// let dadJokeResults = await getDadJoke();
		// discordHook.send(`Somebody matched an ask! WOOHOO I'M RICH!! ${dadJokeResults.joke}`);
		offer = {
			1:(askPriceXCH * xchMultiplier),
			2:-(askPriceCAT * catMultiplier),
		};
	}
	else if (myBids.length < bidMinOrders) {
		console.log('Creating bid...');
		// discordHook.send("Somebody matched a bid!? OH GREAT NOW I'M POOR how can you joke at a time like this");
		offer = {
			1:-(bidPriceXCH * xchMultiplier),
			2:(bidPriceCAT * catMultiplier),
		};
	}
	else {
		console.log('Book full, sleeping...');
	}

	// Now we have either bid/ask order parameters (maybe) so it's time to actually go creeate it. All the
	// complexity of Chia is hidden behind that single beautiful createOffer method. It gives us back an
	// Offer File string and we just send that straight up to Hashgreen's uploadOrder API.
	if (offer) {
		const newOfferResult = await createOffer(offer, orderFeeAmount);
		const uploadResult = await uploadMyOrder(newOfferResult.offer);
		console.log(`Created order with id ${uploadResult.data.id}, sleeping...`);
	}

	// Done! Not so bad, right?

};
module.exports.startMarketMaker = startMarketMaker;