require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config');
const DiscordHandler = require('./services/DiscordHandler');
const scraper = require('./services/scrimmages');

const client = new Discord.Client();
const discordHandler = DiscordHandler(config, scraper);

client.on('ready', () => {
    // console.info(`Logged in as ${client.user.tag}`);
});

client.on('message', async (msg) => {
    const channelId = msg.channel.id;
    const message = msg.content;

    const response = await discordHandler.onMessage(channelId, message);

    if (response) {
        msg.reply(`\`\`\`${response}\`\`\``);
    }
});

client.login(config.discordToken);
