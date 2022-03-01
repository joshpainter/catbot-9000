const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const startDiscordBot = async () => {

	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

	client.commands = new Collection();
	const commandFiles = fs.readdirSync('./workers/discord/commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	}

	const eventFiles = fs.readdirSync('./workers/discord/events').filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}


	client.login(process.env.DISCORD_BOT_CLIENT_TOKEN);
	const guilds = await client.guilds.fetch();
	guilds.forEach(guild => console.info(`--Guild:${guild.name}`));

};
module.exports.startDiscordBot = startDiscordBot;