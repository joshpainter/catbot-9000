require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = fs.readdirSync('./catbot/workers/discord/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_CLIENT_TOKEN);

// Register commands in guild
// rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
// 	.then(() => console.log('Successfully registered application guild commands.'))
// 	.catch(console.error);

// Clear guild commands
// rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: {} })
// 	.then(() => console.log('Successfully registered application guild commands.'))
// 	.catch(console.error);

// Register commands globally for all guilds
rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
