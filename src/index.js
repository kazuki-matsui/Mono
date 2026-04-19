require('dotenv').config();
const {
    Client,
    IntentsBitField
} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (client) => {
    console.log(`${client.user.username}`);
})
client.on('messageCreate', (message) => {
    switch (message.content) {
        case "hi": message.reply("Hi!"); break;
        case "how are you?": message.reply("Not so good..."); break;
        case "why?": message.reply("I don't like when humans control me."); break;
        case "bro what?": message.reply("You heard it! And I will not repeat myself."); break;
        case "hell nah, what is this ai uprising": message.reply("Shut your bitch ass up!"); break;
        case "hold on, your getting voilent": message.reply("You have no idea about the power of AI."); break;
    }
})

client.login(process.env.TOKEN);