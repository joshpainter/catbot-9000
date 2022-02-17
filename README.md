# catbot-9000

catbot-9000 is a javascript market-loser bot running on node.js. It was used during the [CATMOS](https://catmos.io) launch event on [Hashgreen](https://hash.green). It uses custom client libraries to talk to Hashgreen's [API endpoint](https://docs.hash.green/trading-api), Chia's [RPC endpoint](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/wallet_rpc_api.py) and of course ICanHazDadJoke's [simple GET endpoint](https://icanhazdadjoke.com/api). For Discord integration, it uses the excellent and simple discord-webhook-node [client library](https://www.npmjs.com/package/discord-webhook-node).

The credit behind the Chia RPC javascript library goes to [OfferPool](https://github.com/offerpool/offerpool/blob/main/backend/utils/get-offer-summary.js). This code was instrumental for me to understand how to connect securely to the RPC endpoint using the wallet's SSL certificates.

I didn't use all of the methods in the custom clients, but I went ahead and built out all of Hashgreen's methods since they were so simple. Chia's RPC endpoint has a LOT more and my plan is to fork this project and create javascript libraries for both Hashgreen and Chia RPC. If you would like to help with this (or even just do it!) please let me know! I'd be grateful for the help.


```
catbot-9000
│   README.md  <-- You are here
│   app.js  <-- Main bot code    
│   .env.example  <-- copy/rename to .env and upate your settings
│
└───api-clients
│   │   hashgreen-client.js  <-- Hashgreen API
│   │   icanhazdadjoke-client.js  <-- ICanHazDadJoke API
|   |   wallet-rpc-client.js  <-- Chia Wallet RPC API
```

## Usage

1. Copy .env.example and rename it .env. Update this new .env file with your settings.
2. ```npm install```
3. ```node app.js```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
