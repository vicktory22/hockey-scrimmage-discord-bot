require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config");
const scrimmages = require("./services");

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    if (msg.channel.id != config.channel_id) return;
    if (msg.content != "show") return;

    scrimmages
        .fetch()
        .then((scrimmages) => msg.reply("```" + scrimmages + "```"))
        .catch((error) => msg.reply("An error occured"));
});

client.login(config.discord_token);
