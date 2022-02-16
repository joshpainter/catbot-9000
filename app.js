require("dotenv").config();
const { Webhook } = require('discord-webhook-node');
const { getMarkets, getOrderBook, getTradeStatistics, getMyOrders, uploadMyOrder, cancelMyOrder } = require("./api_clients/hashgreen-client");
const { getDadJoke } = require("./api_clients/icanhazdadjoke-client");
const { getOfferSummary, getOfferValidity, createOffer } = require("./api_clients/wallet-rpc-client");

const processOrders = async () => {

    const discordHook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

    const hg_market_id = process.env.HASHGREEN_MARKET_ID;

    // These are the basic prices that you want to set for your trade. WARNING: As is, this is dumb and will
    // lose you money!! (Trust me)
    var askPriceCAT = 500; // You will offer 500 of your CAT in the ask order
    var askPriceChia = 0.001; // You want 0.001 XCH back in the ask order
    var bidPriceCAT = 450; // You want 450 of your CAT back in the bid order
    var bidPriceChia = 0.001; // You will offer 0.001 XCH in the bid order
    //End basic prices code


    // This little bit was used as a countdown timer. The bid/ask price drops every minute until it hits a floor.
    // If you don't want this "feature" then comment out these next few lines.
    var endTime = new Date(Date.parse("2022-02-16T00:00:00"));
    const total = Date.parse(endTime) - Date.parse(new Date());
    const minutes = Math.floor(total / 1000 / 60);
    askPrice = (minutes + 30);
    if (askPrice <= 350) askPrice = 350;
    bidPrice = (minutes + 10);
    if (bidPrice <= 400) bidPrice = 400;
    // End of countdown timer code


    // Now let's make our first API call - we need to go get the current order book for our CAT and split them
    // into bid/ask arrays so we can work with them. The filter I use here assumes that all under 550 are my
    // existing offers, but even if they aren't that's ok cause the order book is full.
    const openOrders = await getOrderBook(hg_market_id);
    const myAsks = openOrders.data.asks.filter(ask => ask[3]<=550 && ask[4]==0.001);
    const myBids = openOrders.data.bids.filter(bid => bid[3]<=550 && bid[4]==0.001);
    console.log(`Woke up and found ${myAsks.length} asks and ${myBids.length} bids...`)
    // End of get order book

    // Now let's put together the offer for either the bid or the ask, depending on which one we need to create.
    // We always want to keep at least 10 orders on both sides of the order book but we only want to create one
    // at a time per ORDER_CHECK_INTERVAL.
    // But first we need to go get a dadjoke of course and we should also send it over to Discord.
    var offer = null;
    if (myAsks.length < 10) {
        console.log("Creating ask...");
        var dadJokeResults = await getDadJoke();
        discordHook.send(`Somebody matched an ask! WOOHOO I'M RICH!! ${dadJokeResults.joke}`);
        offer = {
            1:(askPriceChia * 1000000000000), // 1 always means XCH
            2:-(askPrice * 1000) // 2 is the first CAT in your wallet. You can get the index of your CAT
        };        
    }
    else if (myBids.length < 10) {
        console.log("Creating bid...");
        discordHook.send("Somebody matched a bid!? OH GREAT NOW I'M POOR how can you joke at a time like this");
        offer = {
            1:-(bidPriceChia * 1000000000000),
            2:(bidPrice * 1000)
        };
    }
    else {
        console.log("Book full, sleeping...");
    }

    // Now we have either bid/ask order parameters (maybe) so it's time to actually go creeate it. All the
    // complexity of Chia is hidden behind that single beautiful createOffer method. It gives us back an
    // Offer File string and we just send that straight up to Hashgreen's uploadOrder API.
    if (offer) {
        const newOfferResult = await createOffer(offer);
        const uploadResult = await uploadMyOrder(newOfferResult.offer);
        console.log(`Created order with id ${uploadResult.data.id}, sleeping...`);
    }

    // Done! Not so bad, right?
    
}

const start = async () => {
    await processOrders();
    setInterval(processOrders, process.env.ORDER_CHECK_INTERVAL * 1000);
};

start();








