require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config");
const { handleMessage } = require("./services/messageParser");

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    if (msg.channel.id != config.channelId) return;

    const actionWords = ["SHOW", "SHOOT"];
    const message = msg.content.toUpperCase();

    if (actionWords.includes(message)) {
        const reply = await handleMessage(message);
        msg.reply("```" + reply + "```");
    }
});

client.login(config.discordToken);
