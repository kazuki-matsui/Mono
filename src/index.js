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
client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'home') {
        interaction.reply('hello');
    }
});

client.login(process.env.TOKEN);