# catbot-9000

catbot-9000 is a Chia bot framework running on node.js. It was used during the [CATMOS](https://catmos.io) launch event on [Hashgreen](https://hash.green).

If you are looking for the simpler "hello world" version of catbot-9000 that was actually used for the Hashgreen launch, change the branch to 0.1-hello-world.

It uses custom client libraries for the following APIs:
* Chia's [RPC endpoint](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/rpc/wallet_rpc_api.py)
* Hashgreen's [API endpoint](https://docs.hash.green/trading-api)
* ICanHazDadJoke's [simple GET endpoint](https://icanhazdadjoke.com/api). 
* Taildatabase's [API endpoint](https://api.taildatabase.com/docs/)
* XchToken's [API endpoint](https://xchtoken.org/token_api.php)
* Spacescan's [API endpoint](https://github.com/spacescan-io/docs/tree/main/docs/for-developers)

It also uses the following libraries:
* For Discord integration, it uses the excellent [Discord.js](https://discord.js.org/) client library.
* For parsing emojis from text, it uses the [emoji-translate](https://github.com/notwaldorf/emoji-translate) library.

The credit behind the Chia RPC javascript library goes to [OfferPool](https://github.com/offerpool/offerpool/blob/main/backend/utils/get-offer-summary.js). This code was instrumental for me to understand how to connect securely to the RPC endpoint using the wallet's SSL certificates.


```
catbot-9000
└─── README.md  .......................................................  You are here
└─── .env.example  ....................................................  copy/rename to .env and upate your settings
│
└─── catbot
	└─── server.js  ...................................................  Main start code
	|
	└─── api-clients
	|   └─── ChiaWalletRpcClient.js  ..................................  Chia Wallet RPC API
	│   └─── HashgreenClient.js  ......................................  Hashgreen API
	│   └─── ICanHazDadJokeClient.js  .................................  ICanHazDadJoke API
	│   └─── SpacescanClient.js  ......................................  Spacescan API
	│   └─── TailDatabaseClient.js  ...................................  TailDatabase API
	│   └─── XchTokenClient.js  .......................................  XchToken API
	│
	└───controllers
	|   └─── TokenController.js  ......................................  token syncing and aggregation logic
	│
	└───models
	|   └─── Token.js  ................................................  token data structures
	│
	└───workers  ......................................................  each worker is a different bot
		└─── discord  .................................................  all logic for discord bot
		|	└─── DeployCommands.js  ...................................  deploys commands to Discord servers
		|	└─── DiscordBot.js  .......................................  start code for Discord bot
		|	|		
		|   └─── commands  ............................................  command interation
		|   |   └─── Cat.js  ..........................................  handles /cat command
		|   |   └─── Config.js  .......................................  handles /config command
		|   |   └─── Prove.js  ........................................  handles /prove command
		|   |		
		|   └─── events  ..............................................  event interation
		|   |   └─── CatAutoCompleteInteraction.js  ...................  handles autocomplete for /cat
		|   |   └─── CatSelectMenuInteraction.js  .....................  handles select menu for /cat
		|   |   └─── ClientReady.js  ..................................  handles main Discord client events
		|   |   └─── CommandInteractionRouter.js  .....................  routes all command events
		|   |   └─── ProveButtonInteraction.js  .......................  handles buttons for /prove
		|   |   └─── UploadOfferFileMessage.js  .......................  handles offer upload messages
		|   |		
		|   └─── templates  ...........................................  templates for embeds/components
		|       └─── CatConfigureComponents.js  .......................  configures /cat components
		|       └─── CatConfigureEmbeds.js  ...........................  configures /cat embeds
		|       └─── OfferConfigureEmbeds.js  .........................  configures offer upload embeds
		|   
		└─── market-maker  ............................................  market maker bot
			└─── MarketMakerBot.js  ...................................  all logic for market maker bot
```

## Usage

1. Copy .env.example and rename it .env. Update this new .env file with your settings.
2. ```npm install```
3. ```node app.js```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
