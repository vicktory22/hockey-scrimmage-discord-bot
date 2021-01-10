require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config");
const scrimmages = require("./services/scrimmages");

const client = new Discord.Client();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
    if (msg.channel.id != config.channel_id) return;
    let reply;
    if (msg.content.toUpperCase() === "SHOW") {
        try {
            reply = await scrimmages.fetch();
        } catch (error) {
            reply = "An error occured";
        }
    }
    if (msg.content.toUpperCase() === "SHOOT") {
        reply = getRandomInt(2) === 0 ? "You Scored!" : "You Missed :(";
    }

    msg.reply("```" + reply + "```");
});

client.login(config.discord_token);
